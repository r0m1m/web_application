let map = L.map('map', {
    center: [23.983766, 89.954878],
    zoom: 7
});
// let basemap = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//     attribution: '© OpenStreetMap'
// }).addTo(map);
let basemap = L.esri.basemapLayer('Imagery').addTo(map);
let wardlayer = null;
let pointlayer = null;
let legendLabels = [];
const getmapdata = async (city) => {

    if (wardlayer)
        wardlayer.remove();
    if (pointlayer)
        pointlayer.remove();
    let response = await fetch(`/cityprofile/map/${city}`).then(res => res.json());

    let jsondata = {};
    let features = [];
    let pointsdata = {};
    let pointfeatures = [];
    legendLabels = [];
    response.wards.forEach(data => {

        features.push({
            "type": "Feature",
            "properties": {
                "density": parseFloat(data.population) / parseFloat(data.area_sqkm),
                "ward": data.ward
            },
            "geometry": JSON.parse(data.geometry)
        });
    });

    response.points.forEach(data => {
        switch (data.feature) {
            case 'Dustbin':
                if (data.type == 'Informal') {
                    if (!legendLabels.includes("Informal Bin")) {
                        legendLabels.push("Informal Bin");
                    }
                    pointfeatures.push({
                        "type": "Feature",
                        "properties": {
                            "name": "Informal Bin"
                        },
                        "geometry": JSON.parse(data.geometry)
                    });
                } else {
                    if (!legendLabels.includes(data.feature)) {
                        legendLabels.push(data.feature);
                    }
                    pointfeatures.push({
                        "type": "Feature",
                        "properties": {
                            "name": data.feature
                        },
                        "geometry": JSON.parse(data.geometry)
                    });
                }
                break;
            case 'Dumping Site':
                if (data.type == 'Informal') {
                    if (!legendLabels.includes("Informal Dumping Site")) {
                        legendLabels.push("Informal Dumping Site");
                    }
                    pointfeatures.push({
                        "type": "Feature",
                        "properties": {
                            "name": "Informal Dumping Site"
                        },
                        "geometry": JSON.parse(data.geometry)
                    });
                } else {
                    if (!legendLabels.includes(data.feature)) {
                        legendLabels.push(data.feature);
                    }
                    pointfeatures.push({
                        "type": "Feature",
                        "properties": {
                            "name": data.feature
                        },
                        "geometry": JSON.parse(data.geometry)
                    });
                }
                break;
            default:
                if (!legendLabels.includes(data.feature)) {
                    legendLabels.push(data.feature);
                }
                pointfeatures.push({
                    "type": "Feature",
                    "properties": {
                        "name": data.feature
                    },
                    "geometry": JSON.parse(data.geometry)
                });
                break;
        }
    });

    jsondata["type"] = "FeatureCollection";
    jsondata["features"] = features;

    pointsdata["type"] = "FeatureCollection";
    pointsdata["features"] = pointfeatures;

    wardlayer = L.geoJson(jsondata, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);

    map.flyToBounds(wardlayer.getBounds());
    pointlayer = L.geoJson(pointsdata, {
        pointToLayer: getmarker,
        onEachFeature: onEachPFeature
    }).addTo(map);
    legend.addTo(map);
};
map._layersMinZoom = 10;
let info = L.control();

function getmarker(f, ll) {

    return L.circleMarker(ll, {
        radius: 5,
        fillColor: getColor(f.properties.name),
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    })
}

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = (props ?
        'Location: <b>Ward No: ' + props.ward + '</b><br /><b>' + (props.density).toFixed(2) + '</b> population/km<sup>2</sup>' :
        'Hover over a ward');
};

info.addTo(map);
var legend = L.control({
    position: 'bottomleft'
});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend');

    div.innerHTML += '<h6 class="text-center"><b>Legend</b></h6>';
    // loop through our density intervals and generate a label with a colored square for each interval
    legendLabels.forEach(label => {
        div.innerHTML += '<div><i style="background: ' + getColor(label) + '; width: 10px; height: 10px; border-radius: 50%"></i>' + label + '</div>'
    });

    return div;
};


function onEachPFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties) {
        layer.bindPopup(feature.properties.name);
    }
}

function getColor(name) {

    switch (name) {
        case "Public Toilet":
            return '#FFA500';
        case "Informal Bin":
            return '#C8656C';
        case "Dustbin":
            return '#2C9595';
        case "Informal Dumping Site":
            return '#CEDC47';
        case "Slum":
            return '#AC6DC3';
        case "Dumping Site":
            return '#595EA9';
        case "Secondary Transfer Station":
            return '#F0D994';
        case "Treatment Plant":
            return '#4A5544';
        default:
            return 'white';
    }
}

function style(feature) {
    return {
        fillColor: '#2F4B7C',
        weight: 2,
        opacity: 1,
        // color: 'yellow',
        dashArray: '2',
        fillOpacity: 1
    };
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#2F4B7C',
        dashArray: '',
        fillOpacity: 0.3
    });

    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    wardlayer.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}
const cityDropdown = document.getElementById('chartcityselector');
cityDropdown.onchange = () => {
    oncitychange();
};
const width = 600;
const radius = width / 2;
const breadcrumbWidth = 75;
const breadcrumbHeight = 30;
let fsmevent = new CustomEvent("input");

const getdata = async (selectedCity) => {
    let response = await fetch(`/cityprofile/data/${selectedCity}`).then(res => res.json());

    let customdata = {
        "name": "SWM"
    };
    let customechildren = [];
    let hobj = {};
    let householdchildren = [];
    let vobj = {};
    let vchildren = [];
    let collectedobj = {};
    let collectedChildren = [];
    let colObj = {};
    let nonobj = {};
    let collectablechildren = [];
    let noncollectablechildren = [];

    response.dataset01.forEach(datarowOne => {
        if (datarowOne.Q_7_4 == 'Household dump themselves') {
            response.dataset02.forEach(datarowTwo => {
                if (datarowTwo.Q_7_6 == 'Drain' || datarowTwo.Q_7_6 == 'Dug hole' || datarowTwo.Q_7_6 == 'Open ground') {
                    let uobj = {};
                    uobj['name'] = datarowTwo.Q_7_6;
                    uobj['value'] = (parseInt(datarowTwo.count) / parseInt(datarowOne.count)).toFixed(2);
                    noncollectablechildren.push(uobj);
                } else if (datarowTwo.Q_7_6 == 'Nearby dustbin' || datarowTwo.Q_7_6 == 'Roadside') {
                    let cobj = {};
                    cobj['name'] = datarowTwo.Q_7_6;
                    cobj['value'] = (parseInt(datarowTwo.count) / parseInt(datarowOne.count)).toFixed(2);
                    collectablechildren.push(cobj);

                }
            });
            colObj['name'] = 'Collectable';
            colObj['children'] = collectablechildren;
            nonobj['name'] = 'Non-collectable';
            nonobj['children'] = noncollectablechildren;
            householdchildren.push(colObj);
            householdchildren.push(nonobj);
            hobj['name'] = 'Household dump';
            hobj['children'] = householdchildren;
            customechildren.push(hobj);
        } else {
            if (datarowOne.Q_7_4 == 'Van operated by local clubs or other local organizations') {
                let lcobj = {};
                lcobj['name'] = 'Local club';
                lcobj['value'] = (parseInt(datarowOne.count) / parseInt(response.total)).toFixed(2);
                collectedChildren.push(lcobj);
            } else if (datarowOne.Q_7_4 == 'Van operated by municipality') {
                let mobj = {};
                mobj['name'] = 'Municipality';
                mobj['value'] = (parseInt(datarowOne.count) / parseInt(response.total)).toFixed(2);
                collectedChildren.push(mobj);
            } else if (datarowOne.Q_7_4 == 'Van operated by NGOs') {
                let nobj = {};
                nobj['name'] = 'NGOs';
                nobj['value'] = (parseInt(datarowOne.count) / parseInt(response.total)).toFixed(2);
                collectedChildren.push(nobj);
            } else if (datarowOne.Q_7_4 == 'Van operated by private agencies') {
                let aobj = {};
                aobj['name'] = 'Private agencies';
                aobj['value'] = (parseInt(datarowOne.count) / parseInt(response.total)).toFixed(2);
                collectedChildren.push(aobj);
            }

        }

    });
    collectedobj['name'] = 'Collected';
    collectedobj['children'] = collectedChildren;
    vchildren.push(collectedobj);
    vobj['name'] = 'Van collection';
    vobj['children'] = vchildren;
    customechildren.push(vobj);
    customdata['children'] = customechildren;

    return customdata;
};

function breadcrumbPoints(d, i) {
    const tipWidth = 10;
    const points = [];
    points.push("0,0");
    points.push(`${breadcrumbWidth},0`);
    points.push(`${breadcrumbWidth + tipWidth},${breadcrumbHeight / 2}`);
    points.push(`${breadcrumbWidth},${breadcrumbHeight}`);
    points.push(`0,${breadcrumbHeight}`);
    if (i > 0) {
        // Leftmost breadcrumb; don't include 6th vertex.
        points.push(`${tipWidth},${breadcrumbHeight / 2}`);
    }
    return points.join(" ");
}

const partition = (data) =>
    d3.partition().size([2 * Math.PI, radius * radius])(
        d3
        .hierarchy(data)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value)
    );
const color = (d) => {
    const color = d3
        .scaleOrdinal()
        .domain(["Household dump", "Van collection", "Non-collectable", "Collectable", "Collected", "Open ground", "Dug hole", "Drain", "Nearby dustbin", "Road side", "Municipality", "Local club", "Private agencies"])
        .range(["#F2D973", "#98BA78", "#ED5D6B", "#F6D057", "#769D55", "#E84951", "#E84951", "#E84951", "#5C7C3E", "#F7BF21", "#5C7C3E", "#5C7C3E", "#5C7C3E"]);
    return color(d.data.name)
}

const gc_color = (d) => {
    const color = d3
        .scaleOrdinal()
        .domain(["Good", "Moderate", "Bad"])
        .range(["#98BA78", "#F2D973", "#ED5D6B"]);
    if (d.data.name == '0 - 3 meter') {
        return color('Moderate');
    } else if (d.data.name == 'Single pit lined' || d.data.name == 'Double pit' || d.data.name == 'Single pit unlined/ dug hole') {
        if (d.parent.data.name == '0 - 3 meter') {
            return color('Bad');
        } else {
            return color('Good');
        }
    } else if (d.data.name == 'Nearby water bodies' || d.data.name == 'Open ground' || d.data.name == 'Soak pit') {
        if (d.parent.parent.data.name == '0 - 3 meter') {
            return color('Bad');
        } else {
            return color('Moderate');
        }
    } else {
        return color('Good');
    }
}

const ca_color = (d) => {
    const color = d3
        .scaleOrdinal()
        .domain(["Good", "Moderate", "Bad"])
        .range(["#98BA78", "#F2D973", "#ED5D6B"]);
    if (d.data.name == '0 � 30 meters') {
        return color('Good');
    } else if (d.data.name == 'Septic tank') {
        if (d.parent.data.name == '0 � 30 meters') {
            return color('Good');
        } else {
            return color('Bad');
        }
    } else if (d.data.name == 'Single pit lined') {
        if (d.parent.data.name == '0 � 30 meters') {
            return color('Moderate');
        } else {
            return color('Bad');
        }
    } else if (d.data.name == 'Pick-up' || d.data.name == 'Truck') {
        if (d.parent.parent.data.name == '0 � 30 meters' && d.parent.data.name == 'Septic tank') {
            return color('Good');
        } else if (d.parent.parent.data.name == '0 � 30 meters' && d.parent.data.name == 'Single pit lined') {
            return color('Moderate');
        } else {
            return color('Bad');
        }
    } else if (d.data.name == 'Van' || d.data.name == 'Rickshaw') {
        if (d.parent.parent.data.name == '0 � 30 meters' && d.parent.data.name == 'Septic tank') {
            return color('Moderate');
        } else if (d.parent.parent.data.name == '0 � 30 meters' && d.parent.data.name == 'Single pit lined') {
            return color('Moderate');
        } else {
            return color('Bad');
        }
    } else {
        return color('Bad');
    }
}


const mousearc = d3
    .arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .innerRadius(d => Math.sqrt(d.y0))
    .outerRadius(radius);

const arc = d3
    .arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .padAngle(1 / radius)
    .padRadius(radius)
    .innerRadius(d => Math.sqrt(d.y0))
    .outerRadius(d => Math.sqrt(d.y1) - 1);

const draw = (data, sunid, breadcrumbid, clr) => {
    const root = partition(data);
    const svg = d3.create("svg");
    // Make this into a view, so that the currently hovered sequence is available to the breadcrumb
    const element = svg.node();
    element.value = {
        sequence: [],
        percentage: 0.0
    };

    const label = svg
        .append("text")
        .attr("text-anchor", "middle")
        .attr("fill", "#888")
        .style("visibility", "hidden");

    label
        .append("tspan")
        .attr("class", "percentage")
        .attr("x", 0)
        .attr("y", 0)
        .attr("dy", "-0.1em")
        .attr("font-size", "3em")
        .text("");

    label
        .append("tspan")
        .attr("x", 0)
        .attr("y", 0)
        .attr("dy", "1.5em")
        .text("of Households");

    svg
        .attr("viewBox", `${-radius} ${-radius} ${width} ${width}`)
        .style("max-width", `${width}px`)
        .style("font", "12px sans-serif");

    const path = svg
        .append("g")
        .selectAll("path")
        .data(
            root.descendants().filter(d => {
                // Don't draw the root node, and for efficiency, filter out nodes that would be too small to see
                return d.depth && d.x1 - d.x0 > 0.001;
            })
        )
        .join("path")
        .attr("fill", d => clr(d))
        .attr("d", arc);

    svg
        .append("g")
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .on("mouseleave", () => {
            path.attr("fill-opacity", 1);
            label.style("visibility", "hidden");
            // Update the value of this view
            element.value = {
                sequence: [],
                percentage: 0.0
            };
            // element.dispatchEvent(new CustomEvent("input"));
            bread(element.value, breadcrumbid, clr);
        })
        .selectAll("path")
        .data(
            root.descendants().filter(d => {
                // Don't draw the root node, and for efficiency, filter out nodes that would be too small to see
                return d.depth && d.x1 - d.x0 > 0.001;
            })
        )
        .join("path")
        .attr("d", mousearc)
        .on("mouseenter", d => {
            // Get the ancestors of the current segment, minus the root
            const sequence = d
                .ancestors()
                .reverse()
                .slice(1);
            // Highlight the ancestors
            path
                .attr("fill-opacity", node =>
                    sequence.indexOf(node) >= 0 ? 1.0 : 0.3
                );
            const percentage = ((100 * d.value) / root.value).toPrecision(3);
            label
                .style("visibility", null)
                .select(".percentage")
                .text(percentage + "%");
            // Update the value of this view with the currently hovered sequence and percentage
            element.value = {
                sequence,
                percentage
            };
            // element.dispatchEvent(new CustomEvent("input"));
            bread(element.value, breadcrumbid, clr);
        });

    document.getElementById(sunid).appendChild(element);
}

function bread(val, breadcrumb, clr) {
    document.getElementById(breadcrumb).innerHTML = '';
    let svgsun = d3
        .create("svg")
        .attr("viewBox", `0 0 ${breadcrumbWidth * 4} ${breadcrumbHeight}`)
        .style("font", "12px sans-serif")
        .style("margin", "5px");

    let g = svgsun
        .selectAll("g")
        .data(val.sequence)
        .join("g")
        .attr("transform", (d, i) => `translate(${i * breadcrumbWidth}, 0)`);

    g.append("polygon")
        .attr("points", breadcrumbPoints)
        .attr("fill", d => clr(d))
        .attr("stroke", "white");

    g.append("text")
        .attr("x", (breadcrumbWidth + 10) / 2)
        .attr("y", 15)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .attr("font-size", ".8em")
        .attr("fill", "white")
        .text(d => d.data.name);

    svgsun
        .append("text")
        .text(val.percentage > 0 ? val.percentage + "%" : "")
        .attr("x", (val.sequence.length + 0.5) * breadcrumbWidth)
        .attr("y", breadcrumbHeight / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle");
    document.getElementById(breadcrumb).appendChild(svgsun.node());
}

const get_wastesankeydata = async (selectedCity) => {
    let response = await fetch(`/cityprofile/wastesankey/city/${selectedCity}`).then(res => res.json());
    console.log(response);
    let van_total = 0;
    let dustbin = 0;
    const uniqarray = ['HH generation'];
    const nodes = [{
        name: 'HH generation'
    }];
    const links = [];

    response.dataset01.forEach(data => {
        switch (data['Q_7_4']) {
            case 'Household dump themselves':
                if (!uniqarray.includes('Household')) {
                    uniqarray.push('Household');
                    nodes.push({
                        name: 'Household'
                    });
                    uniqarray.push('Self carried');
                    nodes.push({
                        name: 'Self carried'
                    });
                    uniqarray.push('Van');
                    nodes.push({
                        name: 'Van'
                    });
                }
                links.push({
                    source: 'HH generation',
                    target: 'Household',
                    value: parseFloat(data.count) / parseFloat(response.total)
                });
                links.push({
                    source: 'Household',
                    target: 'Self carried',
                    value: parseFloat(data.count) / parseFloat(response.total)
                });
                break;
            case 'Van operated by local clubs or other local organizations':
                if (!uniqarray.includes('Local club')) {
                    uniqarray.push('Local club');
                    nodes.push({
                        name: 'Local club'
                    });
                }
                links.push({
                    source: 'HH generation',
                    target: 'Local club',
                    value: parseFloat(data.count) / parseFloat(response.total)
                });
                links.push({
                    source: 'Local club',
                    target: 'Van',
                    value: parseFloat(data.count) / parseFloat(response.total)
                });
                van_total += parseFloat(data.count) / parseFloat(response.total);
                break;
            case 'Van operated by municipality':
                if (!uniqarray.includes('Municipality')) {
                    uniqarray.push('Municipality');
                    nodes.push({
                        name: 'Municipality'
                    });
                }
                links.push({
                    source: 'HH generation',
                    target: 'Municipality',
                    value: parseFloat(data.count) / parseFloat(response.total)
                });
                links.push({
                    source: 'Municipality',
                    target: 'Van',
                    value: parseFloat(data.count) / parseFloat(response.total)
                });
                van_total += parseFloat(data.count) / parseFloat(response.total);
                break;
            case 'Van operated by NGOs':
                if (!uniqarray.includes('NGOs')) {
                    uniqarray.push('NGOs');
                    nodes.push({
                        name: 'NGOs'
                    });
                }
                links.push({
                    source: 'HH generation',
                    target: 'NGOs',
                    value: parseFloat(data.count) / parseFloat(response.total)
                });
                links.push({
                    source: 'NGOs',
                    target: 'Van',
                    value: parseFloat(data.count) / parseFloat(response.total)
                });
                van_total += parseFloat(data.count) / parseFloat(response.total);
                break;
            case 'Van operated by private agencies':
                if (!uniqarray.includes('Private agencies')) {
                    uniqarray.push('Private agencies');
                    nodes.push({
                        name: 'Private agencies'
                    });
                }
                links.push({
                    source: 'HH generation',
                    target: 'Private agencies',
                    value: parseFloat(data.count) / parseFloat(response.total)
                });
                links.push({
                    source: 'Private agencies',
                    target: 'Van',
                    value: parseFloat(data.count) / parseFloat(response.total)
                });
                van_total += parseFloat(data.count) / parseFloat(response.total);
                break;
        }
    });

    response.dataset02.forEach(data => {
        if (!uniqarray.includes(data['Q_7_6'])) {
            uniqarray.push(data['Q_7_6']);
            nodes.push({
                name: data['Q_7_6']
            });
        }
        if (data['Q_7_6'] == 'Nearby dustbin') {
            dustbin = parseFloat(data.count) / parseFloat(response.total);
        }
        links.push({
            source: 'Self carried',
            target: data['Q_7_6'],
            value: parseFloat(data.count) / parseFloat(response.total)
        });
    });

    nodes.push({
        name: 'STS'
    });
    nodes.push({
        name: 'Dumping site'
    });

    links.push({
        source: 'Van',
        target: 'STS',
        value: van_total
    });
    links.push({
        source: 'Nearby dustbin',
        target: 'STS',
        value: dustbin
    });
    links.push({
        source: 'STS',
        target: 'Dumping site',
        value: van_total + dustbin
    })

    return {
        nodes,
        links
    };

}

const getsankeyydata = async (selectedCity) => {
    let response = await fetch(`/cityprofile/sankey/${selectedCity}`).then(res => res.json());
    console.log(response);
    const uniqarray = [];
    const nodes = [];
    const links = [];
    response.dataset01.forEach(row => {
        if (row['Q_4_4_1']) {
            if (!uniqarray.includes(row['Q_4_4_1'])) {
                uniqarray.push(row['Q_4_4_1']);
                nodes.push({
                    name: row['Q_4_4_1']
                });
            }
            if (!uniqarray.includes(row['Q_5_1'])) {
                uniqarray.push(row['Q_5_1']);
                nodes.push({
                    name: row['Q_5_1']
                });
            }
            links.push({
                source: row['Q_4_4_1'],
                target: row['Q_5_1'],
                value: (parseFloat(row.count) / parseFloat(response.total))
            });
        }
    });
    response.dataset02.forEach(row => {
        if (row['Q_5_1']) {
            if (!uniqarray.includes(row['Q_5_1'])) {
                uniqarray.push(row['Q_5_1']);
                nodes.push({
                    name: row['Q_5_1']
                });
            }
            if (row['Q_5_13']) {
                if (!uniqarray.includes(row['Q_5_13'])) {
                    uniqarray.push(row['Q_5_13']);
                    nodes.push({
                        name: row['Q_5_13']
                    });
                }
                links.push({
                    source: row['Q_5_1'],
                    target: row['Q_5_13'],
                    value: (parseFloat(row.count) / parseFloat(response.total))
                })
            } else {
                if (!uniqarray.includes('Not emptied')) {
                    uniqarray.push('Not emptied');
                    nodes.push({
                        name: 'Not emptied'
                    });
                }
                links.push({
                    source: row['Q_5_1'],
                    target: 'Not emptied',
                    value: (parseFloat(row.count) / parseFloat(response.total))
                });
            }
        }
    });

    response.dataset03.forEach(row => {

        if (row['Q_5_13']) {
            if (!uniqarray.includes(row['Q_5_13'])) {
                uniqarray.push(row['Q_5_13']);
                nodes.push({
                    name: row['Q_5_13']
                });
            }
            switch (row['Q_5_14']) {
                case 'Carried away with desludger':
                    if (!uniqarray.includes('Desludger')) {
                        uniqarray.push('Desludger');
                        nodes.push({
                            name: 'Desludger'
                        });
                    }
                    if (!uniqarray.includes('No idea')) {
                        uniqarray.push('No idea');
                        nodes.push({
                            name: 'No idea'
                        });
                    }
                    links.push({
                        source: row['Q_5_13'],
                        target: 'Desludger',
                        value: (parseFloat(row.count) / parseFloat(response.total))
                    });
                    links.push({
                        source: 'Desludger',
                        target: 'No idea',
                        value: (parseFloat(row.count) / parseFloat(response.total))
                    });
                    break;
                case 'Carried to treatment plant':
                    if (!uniqarray.includes('Desludger')) {
                        uniqarray.push('Desludger');
                        nodes.push({
                            name: 'Desludger'
                        });
                    }
                    if (!uniqarray.includes('Treatment plant')) {
                        uniqarray.push('Treatment plant');
                        nodes.push({
                            name: 'Treatment plant'
                        });
                    }
                    links.push({
                        source: row['Q_5_13'],
                        target: 'Desludger',
                        value: (parseFloat(row.count) / parseFloat(response.total))
                    });
                    links.push({
                        source: 'Desludger',
                        target: 'Treatment plant',
                        value: (parseFloat(row.count) / parseFloat(response.total))
                    });
                    break;
                case 'Drain':
                    if (!uniqarray.includes(row['Q_5_14'])) {
                        uniqarray.push(row['Q_5_14']);
                        nodes.push({
                            name: row['Q_5_14']
                        });
                    }
                    if (!uniqarray.includes('River/Canal')) {
                        uniqarray.push('River/Canal');
                        nodes.push({
                            name: 'River/Canal'
                        });
                    }
                    links.push({
                        source: row['Q_5_13'],
                        target: row['Q_5_14'],
                        value: (parseFloat(row.count) / parseFloat(response.total))
                    });
                    links.push({
                        source: row['Q_5_14'],
                        target: 'River/Canal',
                        value: (parseFloat(row.count) / parseFloat(response.total))
                    });
                    break;
                case 'Dug hole':
                    if (!uniqarray.includes(row['Q_5_14'])) {
                        uniqarray.push(row['Q_5_14']);
                        nodes.push({
                            name: row['Q_5_14']
                        });
                    }
                    if (!uniqarray.includes('Manual transport')) {
                        uniqarray.push('Manual transport');
                        nodes.push({
                            name: 'Manual transport'
                        });
                    }
                    links.push({
                        source: row['Q_5_13'],
                        target: 'Manual transport',
                        value: (parseFloat(row.count) / parseFloat(response.total))
                    });
                    links.push({
                        source: 'Manual transport',
                        target: row['Q_5_14'],
                        value: (parseFloat(row.count) / parseFloat(response.total))
                    });
                    break;
                case 'Nearby waterbodies':
                    if (!uniqarray.includes(row['Q_5_14'])) {
                        uniqarray.push(row['Q_5_14']);
                        nodes.push({
                            name: row['Q_5_14']
                        });
                    }
                    if (!uniqarray.includes('Manual transport')) {
                        uniqarray.push('Manual transport');
                        nodes.push({
                            name: 'Manual transport'
                        });
                    }
                    links.push({
                        source: row['Q_5_13'],
                        target: 'Manual transport',
                        value: (parseFloat(row.count) / parseFloat(response.total))
                    });
                    links.push({
                        source: 'Manual transport',
                        target: row['Q_5_14'],
                        value: (parseFloat(row.count) / parseFloat(response.total))
                    });
                    break;
                case 'Open ground':
                    if (!uniqarray.includes(row['Q_5_14'])) {
                        uniqarray.push(row['Q_5_14']);
                        nodes.push({
                            name: row['Q_5_14']
                        });
                    }
                    if (!uniqarray.includes('Manual transport')) {
                        uniqarray.push('Manual transport');
                        nodes.push({
                            name: 'Manual transport'
                        });
                    }
                    links.push({
                        source: row['Q_5_13'],
                        target: 'Manual transport',
                        value: (parseFloat(row.count) / parseFloat(response.total))
                    });
                    links.push({
                        source: 'Manual transport',
                        target: row['Q_5_14'],
                        value: (parseFloat(row.count) / parseFloat(response.total))
                    });
                    break;
            }
        }

    });
    return {
        nodes,
        links
    };
}

const updateinfo = async (city) => {
    let info = await fetch(`/cityprofile/info/city/${city}`).then(res => res.json());
    const infoitem = ["area", "population", "density", "wards", "fs_generation", "fs_collection", "fs_treatment", "fstp", "sw_generation", "sw_collection", "sw_treatment", "swtp", "dustbin", "sts", "vaccum_tanker", "truck", "dump_truck", "pick_up", "trolley", "conservancy_officials", "waste_collectors", "pit_cleaners", "road_collectors", "private_pit_cleaners"];
    infoitem.forEach(item => {
        document.getElementById(item).innerHTML = (info[item] % 1 !== 0 ? `<em>${(info[item]).toFixed(2)}</em>` : `<em>${info[item]}</em>`);
    });
    const sgd = ["safemanaged", "basic", "limited", "unimproved", "opendefication"];
    sgd.forEach(s => {
        let el = document.getElementById(s);
        el.animate([{},
            {
                transform: 'rotate(' + (45 + (info[s] * 1.8)) + 'deg)'
            }
        ], {
            duration: 1000
        });
        setTimeout(() => {
            el.style.transform = 'rotate(' + (45 + (info[s] * 1.8)) + 'deg)';
        }, 1000);
        let valel = document.getElementById(s + 'value');
        valel.innerHTML = info[s] + "%";

    });
}

let bgcontext = document.getElementById('bg_chart').getContext('2d');
let chart = new Chart(bgcontext, {
    type: 'bar',
    data: {
        labels: [], //['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '', //'Demo',
            data: [], //[.12, .19, .03, .05, .02, .03],
            backgroundColor: '#c4d4e0'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        animation: {
            animateScale: true,
            animateRotate: true
        },
        legend: {
            position: 'top',
        },
        scales: {
            xAxes: [{
                stacked: false,
                scaleLabel: {
                    display: true
                }
            }],
            yAxes: [{
                stacked: false,
                scaleLabel: {
                    display: true,
                    labelString: ''
                },
                ticks: {
                    callback: (value) => {
                        return Math.round(value * 100) + "%"
                    }
                }
            }]
        },
        tooltips: {
            callbacks: {
                label: (tooltipItem, data) => {
                    let label = data.datasets[tooltipItem.datasetIndex].label || '';
                    if (label) {
                        label += ': ';
                    }
                    label += Math.round(tooltipItem.yLabel * 100) + '%';
                    return label;
                }
            }
        }
    }
});

const updateBg = (data) => {
    chart.data = data;
    chart.update();
}
const updateSFD = (city) => {
    if (city == 'Cumilla')
        document.getElementById('sfdimage').src = '../images/sfd/' + city + '.jpg';
    else
        document.getElementById('sfdimage').src = '../images/sfd/default.jpg';
}
const oncitychange = () => {
    let selectedCity = cityDropdown.options[cityDropdown.selectedIndex].value;
    updateinfo(selectedCity);
    document.getElementById("sunburstbody").innerHTML = '';
    document.getElementById("wastesankey").innerHTML = '';
    document.getElementById("sankeybody").innerHTML = '';
    document.getElementById("gc_sunbody").innerHTML = '';
    document.getElementById("ca_sunbody").innerHTML = '';
    updateSFD(selectedCity);
    getdata(selectedCity).then(d => {
        draw(d, "sunburstbody", "sunburstcrumbs", color);
    });
    getsankeyydata(selectedCity).then(d => {
        drawsankey(d, 'sankeybody', fssankeycolor);
    });
    get_gc_data(selectedCity, 'gc').then(d => {
        draw(d, "gc_sunbody", "gc_suncrumb", gc_color)
    });
    get_gc_data(selectedCity, 'ca').then(d => {
        draw(d, "ca_sunbody", "ca_suncrumb", ca_color);
    });
    get_bg_data(selectedCity).then(data => {
        updateBg(data);
    });
    get_wastesankeydata(selectedCity).then(data => {
        drawsankey(data, 'wastesankey', swsankeycolor);
    });

    getmapdata(selectedCity);
    updateTitle(selectedCity);
};
const updateTitle = (city) => {
    if (city == 'Cumilla') {
        document.getElementById("cityname").textContent = city + ' City Corporation, 2020';
    } else {
        document.getElementById("cityname").textContent = city + ' Paurashava, 2020';
    }
}
oncitychange();