let selectedMapType = 'density';
let selectedUnit = 'population/km<sup>2</sup>'
let selectedCity = null;
const cityDropdown = document.getElementById('chartcityselector');
const indicatorRadio = document.querySelectorAll('input[name="maptype"');

const wardJson = {
    "type": "FeatureCollection"
};
let wardFeatures = [];

const map = L.map('map', {
    center: [23.983766, 89.954878],
    zoom: 7
});

const basemap = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);


const infoPanel = L.control();
infoPanel.onAdd = (map) => {
    this._div = L.DomUtil.create('div', 'info');
    // this.update();
    return this._div;
}
infoPanel.update = (title, props) => {
    this._div.innerHTML = (title ? '<h5>' + title + '</h5>' : 'Title');
    this._div.innerHTML += (props ? 'Ward No: <b>' + props.ward + '</b><br>' + selectedMapType + ': <b>' + props.renderdata + '</b>' + selectedUnit : 'Over over a ward');
}
infoPanel.addTo(map);

const legend = L.control({
    position: 'bottomleft'
});
legend.onAdd = (map) => {
    this._div = L.DomUtil.create('div', 'info legend');
    this._div.innerHTML = '<h5>Legend</h5>'
    return this._div
}
legend.update = () => {
    this._div.innerHTML += "a";
}
legend.addTo(map);

let wardLayer = null;

const changeMapType = async (maptype) => {
    switch (maptype) {
        case 'density':
            let res = await fetch(`/mapapplication/city/${selectedCity}/mapdata/${maptype}`).then(res => res.json());

            let dataarray = [];
            res.forEach(warddata => {
                dataarray[warddata.ward] = parseFloat(warddata.population) / parseFloat(warddata.area_sqkm)
            });
            wardJson["features"].forEach(ward => {
                ward["properties"]["renderdata"] = dataarray[ward["properties"]["ward"]];
            });
            if (wardLayer)
                wardLayer.remove();
            wardLayer = L.geoJson(wardJson, {
                onEachFeature: onEachPFeature
            }).addTo(map);
            break;
        case 'septictank':
            break;
        default:
            break;
    }
}

for (let i = 0; i < indicatorRadio.length; i++) {
    indicatorRadio[i].onclick = function () {
        if (this.value !== selectedMapType) {
            selectedMapType = this.value;
            changeMapType(selectedMapType);
        }
    }
}

const updatecity = async (city) => {
    if (wardLayer)
        wardLayer.remove();
    wardFeatures = [];
    let response = await fetch(`/mapapplication/map/${city}`).then(res => res.json());

    response.forEach(data => {
        wardFeatures.push({
            "type": "Feature",
            "properties": {
                "ward": data.ward,
                "renderdata": 0
            },
            "geometry": JSON.parse(data.geometry)
        });
    });

    wardJson["features"] = wardFeatures;
    wardLayer = L.geoJson(wardJson, {
        onEachFeature: onEachPFeature
    }).addTo(map);
    map.flyToBounds(wardLayer.getBounds());
}

const oncitychange = () => {
    selectedCity = cityDropdown.options[cityDropdown.selectedIndex].value;
    updatecity(selectedCity);
}
cityDropdown.onchange = () => {
    oncitychange();
};

function onEachPFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties) {
        layer.bindPopup("A " + feature.properties.renderdata);
    }
}