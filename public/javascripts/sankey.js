let id = 0;
const swidth = 1000;
const sheight = 400;

const sdata = {
    "nodes": [{
        "name": "Cistern flush",
        "category": "Cistern"
    }, {
        "name": "Double pit",
        "category": "Double"
    }, {
        "name": "No containment",
        "category": "No"
    }, {
        "name": "Septic tank",
        "category": "Septic"
    }, {
        "name": "Single pit lined",
        "category": "Single"
    }, {
        "name": "No need to flush",
        "category": "No"
    }, {
        "name": "Pour flush",
        "category": "Pour"
    }, {
        "name": "Single pit unlined/ dug hole",
        "category": "Single"
    }, {
        "name": "Bucket and rope",
        "category": "Bucket"
    }, {
        "name": "Electric pump",
        "category": "Electric"
    }, {
        "name": "Manual pump",
        "category": "Manual"
    }, {
        "name": "Not emptied",
        "category": "Not"
    }, {
        "name": "Drain",
        "category": "Drain"
    }, {
        "name": "Suction pump (Vacu-tug)",
        "category": "Suction"
    }, {
        "name": "Van",
        "category": "Van"
    }, {
        "name": "Manual transport",
        "category": "Manual"
    }, {
        "name": "Vacu-tug",
        "category": "Vacu-tug"
    }, {
        "name": "Carried away",
        "category": "Carried"
    }, {
        "name": "River/Canal",
        "category": "River/Canal"
    }, {
        "name": "Dug hole",
        "category": "Dug"
    }, {
        "name": "Nearby waterbodies",
        "category": "Nearby"
    }, {
        "name": "Open ground",
        "category": "Open"
    }],
    "links": [{
        "source": "Cistern flush",
        "target": "Double pit",
        "value": 0.004662005
    }, {
        "source": "Cistern flush",
        "target": "No containment",
        "value": 0.002331002
    }, {
        "source": "Cistern flush",
        "target": "Septic tank",
        "value": 0.167832168
    }, {
        "source": "Cistern flush",
        "target": "Single pit lined",
        "value": 0.004662004
    }, {
        "source": "No need to flush",
        "target": "No containment",
        "value": 0.004662004
    }, {
        "source": "Pour flush",
        "target": "Double pit",
        "value": 0.097902098
    }, {
        "source": "Pour flush",
        "target": "No containment",
        "value": 0.009324009
    }, {
        "source": "Pour flush",
        "target": "Septic tank",
        "value": 0.414918415
    }, {
        "source": "Pour flush",
        "target": "Single pit lined",
        "value": 0.27972028
    }, {
        "source": "Pour flush",
        "target": "Single pit unlined/ dug hole",
        "value": 0.013986014
    }, {
        "source": "Double pit",
        "target": "Bucket and rope",
        "value": 0.032634033
    }, {
        "source": "Double pit",
        "target": "Electric pump",
        "value": 0.034965035
    }, {
        "source": "Double pit",
        "target": "Manual pump",
        "value": 0.004662005
    }, {
        "source": "Double pit",
        "target": "Not emptied",
        "value": 0.03030303
    }, {
        "source": "No containment",
        "target": "Drain",
        "value": 0.016317016
    }, {
        "source": "Septic tank",
        "target": "Bucket and rope",
        "value": 0.111888112
    }, {
        "source": "Septic tank",
        "target": "Electric pump",
        "value": 0.128205128
    }, {
        "source": "Septic tank",
        "target": "Manual pump",
        "value": 0.004662005
    }, {
        "source": "Septic tank",
        "target": "Suction pump (Vacu-tug)",
        "value": 0.025641026
    }, {
        "source": "Septic tank",
        "target": "Not emptied",
        "value": 0.312354312
    }, {
        "source": "Single pit lined",
        "target": "Bucket and rope",
        "value": 0.135198135
    }, {
        "source": "Single pit lined",
        "target": "Electric pump",
        "value": 0.051282051
    }, {
        "source": "Single pit lined",
        "target": "Manual pump",
        "value": 0.006993007
    }, {
        "source": "Single pit lined",
        "target": "Not emptied",
        "value": 0.090909091
    }, {
        "source": "Bucket and rope",
        "target": "Van",
        "value": 0.006993007
    }, {
        "source": "Bucket and rope",
        "target": "Drain",
        "value": 0.090909091
    }, {
        "source": "Bucket and rope",
        "target": "Manual transport",
        "value": 0.181818194
    }, {
        "source": "Electric pump",
        "target": "Drain",
        "value": 0.090909091
    }, {
        "source": "Electric pump",
        "target": "Manual transport",
        "value": 0.123543124
    }, {
        "source": "Manual pump",
        "target": "Drain",
        "value": 0.004662005
    }, {
        "source": "Manual pump",
        "target": "Manual transport",
        "value": 0.011655011
    }, {
        "source": "Suction pump (Vacu-tug)",
        "target": "Vacu-tug",
        "value": 0.025641026
    }, {
        "source": "Van",
        "target": "Carried away",
        "value": 0.006993007
    }, {
        "source": "Drain",
        "target": "River/Canal",
        "value": 0.202797202
    }, {
        "source": "Manual transport",
        "target": "Dug hole",
        "value": 0.153832168
    }, {
        "source": "Manual transport",
        "target": "Nearby waterbodies",
        "value": 0.137529138
    }, {
        "source": "Manual transport",
        "target": "Open ground",
        "value": 0.023310023
    }, {
        "source": "Vacu-tug",
        "target": "Nearby waterbodies",
        "value": 0.025641026
    }],
    "units": "%"
}
const randomid = () => {
    id++;
    return id;
}
const fssankeycolor = (n) => {
    const color = d3
        .scaleOrdinal()
        .domain(["Bucket and rope", "Cistern flush", "Double pit", "Drain", "Electric pump", "Manual pump", "Manual transport", "No containment", "No need to flush", "Pour flush", "Septic tank", "Single pit lined", "Single pit unlined/ dug hole", "Suction pump (Vacu-tug)", "Vacu-tug", "Van", "Carried away", "Dug hole", "Nearby waterbodies", "Not emptied", "Open ground", "River/Canal", "Desludger", "Treatment plant"])
        .range(["#FFBF00", "#238823", "#FFBF00", "#D2222D", "#238823", "#FFBF00", "#D2222D", "#D2222D", "#D2222D", "#238823", "#238823", "#FFBF00", "#D2222D", "#238823", "#238823", "#FFBF00", "#FFBF00", "#FFBF00", "#D2222D", "#AA8B00", "#D2222D", "#D2222D", "#238823", "#238823"]);
    return color(n);
}
const swsankeycolor = (n) => {
    const color = d3
        .scaleOrdinal()
        .domain(["HH Generation", "Municipality", "Private agency", "NGO", "Local clubs", "Self carried", " Van transport ", "Manual transport", "Nearby dustbin", "STS", "Drain", "Dug hole", "Open ground", "Roadside", "Waterbodies ", "Dumping site", "Treatment plant"])
        .range(["#238823", "#238823", "#238823", "#238823", "#238823", "#FFBF00", "#238823", "#FFBF00", "#238823", "#238823", "#D2222D", "#AA8B00", "#D2222D", "#D2222D", "#D2222D", "#FFBF00", "#238823"]);
    return color(n);
}

const sankeyformat = (d) => {
    const format = d3.format(",.0f");
    return sdata.units ? `${(d.value*100).toFixed(2)} ${sdata.units}` : format;
}

const sankey = (data) => {
    const sankey = d3.sankey()
        .nodeId(d => d.name)
        .nodeAlign(d3[`sankeyLeft`])
        .nodeWidth(15)
        .nodePadding(10)
        .extent([
            [1, 5],
            [swidth - 1, sheight - 5]
        ]);
    return sankey({
        nodes: data.nodes.map(d => Object.assign({}, d)),
        links: data.links.map(d => Object.assign({}, d))
    });
}

const drawsankey = (data, divId, sankeycolor) => {
    const sankeysvg = d3.create("svg")
        .attr("viewBox", [0, 0, swidth, sheight]);

    const {
        nodes,
        links
    } = sankey(data);

    sankeysvg.append("g")
        .selectAll("rect")
        .data(nodes)
        .join("rect")
        .attr("x", d => d.x0)
        .attr("y", d => d.y0)
        .attr("height", d => d.y1 - d.y0)
        .attr("width", d => d.x1 - d.x0)
        .attr("fill", d => sankeycolor(d.name))
        .append("title")
        .text(d => `${d.name}\n${sankeyformat(d.value)}`);

    const link = sankeysvg.append("g")
        .attr("fill", "none")
        .attr("stroke-opacity", 0.5)
        .selectAll("g")
        .data(links)
        .join("g")
        .style("mix-blend-mode", "multiply");

    const defs = link.append("defs");

    const gradient = defs.append("linearGradient")
        .attr("id", (d => d.sid = randomid()))
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", d => d.source.x1)
        .attr("x2", d => d.target.x0);

    gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", d => sankeycolor(d.source.name));

    gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", d => sankeycolor(d.target.name));

    link.append("path")
        .attr("d", d3.sankeyLinkHorizontal())
        .attr("stroke", (d => `url(#${d.sid})`))
        .attr("stroke-width", d => Math.max(1, d.width));

    sankeysvg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 8)
        .selectAll("text")
        .data(nodes)
        .join("text")
        .attr("x", d => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
        .attr("y", d => (d.y1 + d.y0) / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
        .text(d => d.name + ", " + (d.value*100).toFixed(2) + "%");

    document.getElementById(divId).appendChild(sankeysvg.node());
}
