const get_bg_data = async (city) => {
    let response = await fetch(`/cityprofile/bg/city/${city}`).then(res => res.json());

    let labelArray = [];
    let dataLabelArray = ['Black Water', 'Gray Water'];
    let allData = [];

    response.d2d.forEach(d => {
        labelArray.push(d['Q_5_8']);
    });

    dataLabelArray.forEach(dla => {
        let a = {};
        labelArray.forEach(la => {
            a[la] = 0;
        });
        allData[dla] = a;
    });
    let black_drain = 0;
    response.dataset01.forEach(d => {
        if (d['Q_5_5'] && d['Q_5_5'] != 'No outlet') {
            if (d['Q_5_5'] == 'Covered drain' || d['Q_5_5'] == 'Uncovered drain') {
                black_drain += (parseFloat(d.count) / parseFloat(response.total));
                allData['Black Water']['Drain'] = black_drain;
            } else {
                allData['Black Water'][d['Q_5_5']] = (parseFloat(d.count) / response.total);
            }
        }
    });
    response.dataset02.forEach(d => {
        allData['Gray Water'][d['Q_5_8']] = (parseFloat(d.count) / response.total);
    });

    return {
        labels: Object.keys(allData['Black Water']),
        datasets: [{
            label: 'Black Water',
            data: Object.values(allData['Black Water']),
            backgroundColor: 'Black'
        }, {
            label: 'Gray Water',
            data: Object.values(allData['Gray Water']),
            backgroundColor: 'Gray'
        }]
    }
}

const get_gc_data = async (city, type) => {
    let response = await fetch(`/cityprofile/sun/${type}/city/${city}`).then(res => res.json());
    let dataArray = [];
    if (type == 'gc') {
        response.forEach(r => {
            if (r.Q_3_2 && r.Q_5_1 && r.Q_5_5) {
                let childArray = [];
                childArray.push(r.Q_3_2 + '@' + r.Q_5_1 + '@' + r.Q_5_5);
                childArray.push(r.count);
                dataArray.push(childArray);
            }
        });
    } else if (type == 'ca') {
        response.forEach(r => {
            if (r.Q_6_3 && r.Q_5_1 && r.Q_6_2) {
                let childArray = [];
                childArray.push(r.Q_6_3 + '@' + r.Q_5_1 + '@' + r.Q_6_2);
                childArray.push(r.count);
                dataArray.push(childArray);
            }
        });
    }
    return buildHierarchy(dataArray);
}


const buildHierarchy = (csv) => {
    const root = {
        name: "root",
        children: []
    };
    for (let i = 0; i < csv.length; i++) {
        const sequence = csv[i][0];
        const size = +csv[i][1];
        if (isNaN(size)) {
            // e.g. if this is a header row
            continue;
        }
        const parts = sequence.split("@");
        let currentNode = root;
        for (let j = 0; j < parts.length; j++) {
            const children = currentNode["children"];
            const nodeName = parts[j];
            let childNode = null;
            if (j + 1 < parts.length) {
                // Not yet at the end of the sequence; move down the tree.
                let foundChild = false;
                for (let k = 0; k < children.length; k++) {
                    if (children[k]["name"] == nodeName) {
                        childNode = children[k];
                        foundChild = true;
                        break;
                    }
                }
                // If we don't already have a child node for this branch, create it.
                if (!foundChild) {
                    childNode = {
                        name: nodeName,
                        children: []
                    };
                    children.push(childNode);
                }
                currentNode = childNode;
            } else {
                // Reached the end of the sequence; create a leaf node.
                childNode = {
                    name: nodeName,
                    value: size
                };
                children.push(childNode);
            }
        }
    }
    return root;
};