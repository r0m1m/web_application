let maxValue = 99;
let ctx = document.getElementById('chart');
//let demodata = [5, 7, 8, 14, 18, 18, 20, 22, 24, 26, 29, 29, 30, 31, 34, 36, 38, 40, 40, 41, 41, 41, 48, 50, 55, 56, 56, 57, 58, 59, 62, 65, 65, 66, 69, 70, 74, 76, 78, 80, 81, 81, 82, 82, 83, 83, 84, 85, 85, 85, 87, 87, 87, 88, 88, 88, 90, 90, 90, 91, 93, 93, 94, 95];


let districtlayer = null;
let citylayer = null;
let cityjson = {};
let cityfeatures = [];
let jsondata = {};
let features = [];
const getdistrictmap = async () => {
    let response = await fetch('/indicators/districtmap').then(res => res.json());
    jsondata = {};
    features = [];
    response.districts.forEach(data => {
        if (data.district == 'Dhaka' || data.district == 'Khulna' || data.district == 'Chittagong') {
            features.push({
                "type": "Feature",
                "properties": {
                    "district": data.district,
                    "renderdata": 0
                },
                "geometry": JSON.parse(data.geometry)
            });
        } else {
            features.push({
                "type": "Feature",
                "properties": {
                    "district": data.district,
                    "renderdata": 100
                },
                "geometry": JSON.parse(data.geometry)
            });
        }

    });
    jsondata["type"] = "FeatureCollection";
    jsondata["features"] = features;

    districtlayer = L.geoJson(jsondata, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);
    map.flyToBounds(districtlayer.getBounds());

    response.cities.forEach(data => {
        cityfeatures.push({
            "type": "Feature",
            "properties": {
                "city": data.city,
                "renderdata": 5
            },
            "geometry": JSON.parse(data.geometry)
        });
    });
    cityjson["type"] = "FeatureCollection";
    cityjson["features"] = cityfeatures;

    citylayer = L.geoJson(cityjson, {
        pointToLayer: marker,
        onEachFeature: onEachFeature
    }).addTo(map);

    legend.addTo(map);
}

getdistrictmap();

const style = (feature) => {
    return {
        fillColor: feature.properties.renderdata > 0 ? 'yellow' : 'gray',
        weight: .5,
        opacity: 1,
        color: 'black',
        dashArray: '1',
        fillOpacity: 1
    }
}

const marker = (f, ll) => {
    let radius = f.properties.renderdata > 0 ? 5 + (f.properties.renderdata / maxValue) * 10 : 5;

    return L.circleMarker(ll, {
        radius: radius,
        fillColor: getColor(f.properties.renderdata),
        weight: 0,
        opacity: 1,
        fillOpacity: 0.8
    });
}

const getColor = (data) => {
    if (!data) {
        return '#eeeeee';
    }
    let lowValue_color = [0, 255, 0];
    let highValue_color = [255, 0, 0];
    let w1 = data / maxValue;
    let w2 = 1 - w1;
    let rgb = [Math.round(lowValue_color[0] * w1 + highValue_color[0] * w2),
        Math.round(lowValue_color[1] * w1 + highValue_color[1] * w2),
        Math.round(lowValue_color[2] * w1 + highValue_color[2] * w2)
    ];
    return 'rgb(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + '0)';
}


const onEachFeature = (feature, layer) => {
    if (feature.properties.district) {
        layer.bindPopup(feature.properties.district);
    } else if (feature.properties.city) {
        layer.bindPopup(feature.properties.city + '<br>' + feature.properties.renderdata + '%');
    }
}


const map = L.map('mapind', {
    center: [23.983766, 89.954878],
    zoom: 7
});

const basemap = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

const legend = L.control({
    position: 'bottomright'
});
legend.onAdd = (map) => {
    this._div = L.DomUtil.create('div', 'info legend');
    this._div.innerHTML = '<h5>Legend</h5>';
    this._div.innerHTML += '<div style="background: linear-gradient(to bottom, ' + getColor(maxValue) + ' 1%, ' + getColor(.01) + ' 100%); text-align: right;">100%<br><br><br>50%<br><br><br>0%</div>';
    return this._div;
}

let selectedIndicator = null;
const indicatorradios = document.querySelectorAll('input[name="indicators"');

indicatorradios.forEach(indicator => {
    indicator.onclick = function () {
        if (this.value !== selectedIndicator) {
            selectedIndicator = this.value;
            changeIndicator(selectedIndicator);
        }
    }
});

const changeIndicator = async (indicator) => {
    let response = await fetch(`/indicators/indicator/${indicator}`).then(res => res.json());
    let dataarray = {};
    response.sort((a, b) => (parseFloat(a.renderdata) < parseFloat(b.renderdata)) ? -1 : 1);
    let labels = response.map(a => a.city);
    let dataset = response.map(a => parseFloat(a.renderdata));

    maxValue = Math.max(...dataset);
    let colorArray = dataset.map(a => getColor(a));

    switch (indicator) {
        case 'd1':
            chart.options = {
                responsive: true,
                maintainAspectRatio: true,
                animation: {
                    animateScale: true,
                    animateRotate: true
                },
                legend: false,
                scales: {
                    xAxes: [{
                        stacked: true,
                        scaleLabel: {
                            display: true
                        }
                    }],
                    yAxes: [{
                        stacked: true,
                        scaleLabel: {
                            display: true,
                            labelString: ''
                        },
                        ticks: {
                            callback: (value) => {
                                return Math.round(value)
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
                            label += Math.round(tooltipItem.yLabel);
                            return label;
                        }
                    }
                }
            }
            break;
        case 'd2':
            chart.options = {
                responsive: true,
                maintainAspectRatio: true,
                animation: {
                    animateScale: true,
                    animateRotate: true
                },
                legend: false,
                scales: {
                    xAxes: [{
                        stacked: true,
                        scaleLabel: {
                            display: true
                        }
                    }],
                    yAxes: [{
                        stacked: true,
                        scaleLabel: {
                            display: true,
                            labelString: ''
                        },
                        ticks: {
                            callback: (value) => {
                                return Math.round(value)
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
                            label += Math.round(tooltipItem.yLabel);
                            return label;
                        }
                    }
                }
            }
            break;
        case 'd3':
            chart.options = {
                responsive: true,
                maintainAspectRatio: true,
                animation: {
                    animateScale: true,
                    animateRotate: true
                },
                legend: false,
                scales: {
                    xAxes: [{
                        stacked: true,
                        scaleLabel: {
                            display: true
                        }
                    }],
                    yAxes: [{
                        stacked: true,
                        scaleLabel: {
                            display: true,
                            labelString: ''
                        },
                        ticks: {
                            callback: (value) => {
                                return Math.round(value)
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
                            label += Math.round(tooltipItem.yLabel);
                            return label;
                        }
                    }
                }
            }
            break;
        case 'swm_tp_capacity':
            chart.options = {
                responsive: true,
                maintainAspectRatio: true,
                animation: {
                    animateScale: true,
                    animateRotate: true
                },
                legend: false,
                scales: {
                    xAxes: [{
                        stacked: true,
                        scaleLabel: {
                            display: true
                        }
                    }],
                    yAxes: [{
                        stacked: true,
                        scaleLabel: {
                            display: true,
                            labelString: ''
                        },
                        ticks: {
                            callback: (value) => {
                                return Math.round(value) + 'm\u00B3';
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
                            label += Math.round(tooltipItem.yLabel);
                            return label;
                        }
                    }
                }
            }
            break;
        case 'swm_recovery_extent':
            chart.options = {
                responsive: true,
                maintainAspectRatio: true,
                animation: {
                    animateScale: true,
                    animateRotate: true
                },
                legend: false,
                scales: {
                    xAxes: [{
                        stacked: true,
                        scaleLabel: {
                            display: true
                        }
                    }],
                    yAxes: [{
                        stacked: true,
                        scaleLabel: {
                            display: true,
                            labelString: ''
                        },
                        ticks: {
                            callback: (value) => {
                                return Math.round(value) + 'MT';
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
                            label += Math.round(tooltipItem.yLabel);
                            return label;
                        }
                    }
                }
            }
            break;
        default:
            chart.options = {
                responsive: true,
                maintainAspectRatio: true,
                animation: {
                    animateScale: true,
                    animateRotate: true
                },
                legend: false,
                scales: {
                    xAxes: [{
                        stacked: true,
                        scaleLabel: {
                            display: true
                        }
                    }],
                    yAxes: [{
                        stacked: true,
                        scaleLabel: {
                            display: true,
                            labelString: ''
                        },
                        ticks: {
                            callback: (value) => {
                                return Math.round(value) + '%';
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
                            label += Math.round(tooltipItem.yLabel)+'%';
                            return label;
                        }
                    }
                }
            }
            break;

    }

    chart.data.labels = labels;
    chart.data.datasets[0].data = dataset;
    chart.data.datasets[0].backgroundColor = colorArray;
    chart.update();

    response.forEach(d => {
        dataarray[d.city] = parseFloat(d.renderdata);
    });
    citylayer.eachLayer(layer => {
        map.removeLayer(layer);
    });
    if (cityjson) {
        cityjson["features"].forEach(dist => {
            dist["properties"]["renderdata"] = dataarray[dist["properties"]["city"]];
        });
    }
    console.log(cityjson);
    citylayer = L.geoJson(cityjson, {
        pointToLayer: marker,
        onEachFeature: onEachFeature
    }).addTo(map);
    map.flyToBounds(districtlayer.getBounds());

}

let chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [], //["Nilphamari", "Jamalpur", "Magura", "Meherpur", "Noakhali", "Khulna", "Gaibandha", "Khagrachhari", "Mymensingh", "Naogaon", "Lalmonirhat", "Cox's Bazar", "Kushtia", "Munshiganj", "Panchagarh", "Pirojpur", "Gazipur", "Tangail", "Chittagong", "Dinajpur", "Narsingdi", "Nawabganj", "Narayanganj", "Kurigram", "Chuadanga", "Bogra", "Kishoreganj", "Dhaka", "Feni", "Lakshmipur", "Sunamganj", "Shariatpur", "Gopalganj", "Barisal", "Netrakona", "Bandarban", "Jhenaidah", "Rangpur", "Narail", "Sherpur", "Rajshahi", "Sirajganj", "Jessore", "Pabna", "Bagerhat", "Joypurhat", "Maulvibazar", "Habiganj", "Manikganj", "Rajbari", "Madaripur", "Satkhira", "Brahamanbaria", "Faridpur", "Thakurgaon", "Sylhet", "Rangamati", "Barguna", "Cumilla", "Natore", "Jhalokati", "Chandpur", "Patuakhali", "Bhola"],
        datasets: [{
            label: '', //'Indicator1',
            data: [], //demodata,
            backgroundColor: [] //demodata.map(a => getColor(a))
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        animation: {
            animateScale: true,
            animateRotate: true
        },
        legend: false,
        scales: {
            xAxes: [{
                stacked: true,
                scaleLabel: {
                    display: true
                }
            }],
            yAxes: [{
                stacked: true,
                scaleLabel: {
                    display: true,
                    labelString: ''
                },
                ticks: {
                    callback: (value) => {
                        return Math.round(value)
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
                    label += Math.round(tooltipItem.yLabel);
                    return label;
                }
            }
        }
    }
});