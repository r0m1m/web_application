let map = L.map('map', {
    center: [23.983766, 89.954878],
    zoom: 7
});
const indicatorRadio = document.querySelectorAll('input[name="maptype"');
let selectedMapType = null;
function changeMapType(selectedMapType){
    switch (selectedMapType) {
        case 'density':
            
            break;
        case 'septictank':

            break;
        default:
            break;
    }
}
for(let i=0; i<indicatorRadio.length; i++){
    indicatorRadio[i].onclick = function(){
        if(this.value !== selectedMapType) {
            selectedMapType = this.value;
            changeMapType(selectedMapType);
        }
    }
}


let basemap = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

let wardlayer = null;

const getmapdata = async (city) => {
    
    if (wardlayer)
        wardlayer.remove();
    let response = await fetch(`/mapapplication/map/${city}`).then(res => res.json());
    console.log(response);
    let jsondata = {};
    let features = [];
    // console.log(typeof response.geometry);
    response.forEach(data => {
        
        features.push({
            "type": "Feature",
            "properties": {
                "ward": data.ward,
                "density": parseFloat(data.population) / parseFloat(data.area_sqkm)
            },
            "geometry": JSON.parse(data.geometry)
        });
    });
    jsondata["type"] = "FeatureCollection";
    jsondata["features"] = features;
    // console.log(jsondata);

    wardlayer = L.geoJson(jsondata, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);
    map.flyToBounds(wardlayer.getBounds());
    legend.addTo(map);
};

let info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Density</h4>' + (props ?
        'Location: <b>' + props.ward + '</b><br /><b>' + (props.density).toFixed(2) + '</b> population/km<sup>2</sup>' :
        'Hover over a ward');
};

info.addTo(map);
var legend = L.control({
    position: 'bottomleft'
});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 3000, 4000, 7000, 10000, 13000, 16000, 20000],
        labels = [];
    div.innerHTML += '<h6 class="text-center"><b>Legend</b></h6><br>';
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};


function getColor(d) {
    return d > 20000 ? '#800026' :
        d > 16000 ? '#BD0026' :
        d > 13000 ? '#E31A1C' :
        d > 10000 ? '#FC4E2A' :
        d > 7000 ? '#FD8D3C' :
        d > 4000 ? '#FEB24C' :
        d > 1000 ? '#FED976' :
        '#FFEDA0';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: 'blue',
        dashArray: '',
        fillOpacity: 0.3
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
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

const oncitychange = () => {
    let selectedCity = cityDropdown.options[cityDropdown.selectedIndex].value;
    getmapdata(selectedCity);
}