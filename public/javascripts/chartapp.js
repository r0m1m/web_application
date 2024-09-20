
Chart.defaults.global.defaultFontSize = 14;

const cityDropdown = document.getElementById('chartcityselector');
const datasetOneDropdown = document.getElementById('dataset01');
const datasetTwoDropdown = document.getElementById('dataset02');
const groupByDropdown = document.getElementById('groupby');
const chartRadio = document.querySelectorAll('input[name="charttype"');
let chartData = {
    labels: [],
    datasets: []
};
let currentChartType = 'bar';
let dataset01 = {};
let dataset02 = null;
let groupdataset = null;
let selectedChartType = 'bar';

chartRadio.forEach(radio => {
    radio.onclick = function () {
        if (this.value !== selectedChartType) {
            selectedChartType = this.value;
            changeType(selectedChartType);
        }
        
    }
});

const changeType = (type) => {
    switch (type) {
        case 'bar':
            groupByDropdown.value = 0;
            groupByDropdown.disabled = false;
            datasetTwoDropdown.value = 0;
            datasetTwoDropdown.disabled = true;
            datasetOneDropdown.value = 'Q_5_1';
            datasetOneDropdown.disabled = false;           
            updateChartType('bar');
            break;
        case 'pie':
            groupByDropdown.value = 0;
            groupByDropdown.disabled = true;
            datasetTwoDropdown.value = 0;
            datasetTwoDropdown.disabled = true;
            datasetOneDropdown.value = 'Q_5_1';
            datasetOneDropdown.disabled = false;
            updateChartType('pie');
            break;
        case 'line':
            datasetOneDropdown.value = 0;
            datasetOneDropdown.disabled = true;
            datasetTwoDropdown.value = 'Q_5_6';
            datasetTwoDropdown.disabled = false;
            groupByDropdown.value = 0;
            groupByDropdown.disabled = true;
            updateChartType('line');
            break;
    }
}

const updateChartType = (type) => {
    if (type == currentChartType) {
        updateData();
    } else {
        chart.destroy();
        switch (type) {
            case 'bar':
                let baroptions = {
                    responsive: true,
                    maintainAspectRatio: true,
                    animation: {
                        animateScale: true,
                        animateRotate: true
                    },
                    legend: {
                        position: 'top',
                        labels: {
                            fontSize: 18
                        }
                    },
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
                };
                chart = new Chart(ctx, {
                    type: 'bar',
                    data: [],
                    options: baroptions
                });
                currentChartType = 'bar';
                updateData();
                break;
            case 'pie':
                let pieOptions = {
                    responsive: true,
                    maintainAspectRatio: true,
                    animation: {
                        animateScale: true,
                        animateRotate: true
                    },
                    legend: {
                        position: 'right',
                        labels: {
                            fontSize: 18
                        }
                    },
                    tooltips: {
                        callbacks: {
                            label: (tooltipItem, data) => {
                                let label = data.labels[tooltipItem.index] || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += (data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] * 100).toFixed(2) + '%';
                                return label;
                            }
                        }
                    }
                };
                chart = new Chart(ctx, {
                    type: 'pie',
                    data: [],
                    options: pieOptions
                });
                currentChartType = 'pie';
                updateData();
                break;
            case 'line':
                let lineOptions = {
                    responsive: true,
                    maintainAspectRatio: true,
                    animation: {
                        animateScale: true,
                        animateRotate: true
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            fontSize: 18
                        }
                    },
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
                                    return Math.round(value * 100) + "%"
                                }
                            }
                        }]
                    },
                    tooltips: {
                        callbacks: {
                            label: (tooltipItem, data) => {
                                let label = data.labels[tooltipItem.index] || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += (data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] * 100).toFixed(2) + '%';
                                return label;
                            }
                        }
                    }
                }
                chart = new Chart(ctx, {
                    type: 'line',
                    data: [],
                    options: lineOptions
                });
                currentChartType = 'line';
                updateData();
                break;
        }
    }
}

cityDropdown.onchange = () => {
    oncitychange();
};
datasetOneDropdown.onchange = function () {
    updateData();
};
datasetTwoDropdown.onchange = function () {
    updateData();
};
groupByDropdown.onchange = function () {
    updateData();
};


let ctx = document.getElementById('chart').getContext('2d');
let chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],//['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '',//'Demo',
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
            labels: {
                fontSize: 18
            }
        },
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

const unlockAllDataSets = () => {
    datasetOneDropdown.disabled = false;
    // datasetTwoDropdown.disabled = false;
    groupByDropdown.disabled = false;
}

const oncitychange = () => {
    for (let i = 0; i < chartRadio.length; i++) {
        chartRadio[i].disabled = false;
    }
    if(currentChartType == 'bar' && datasetOneDropdown.disabled) {
        datasetOneDropdown.disabled = false;
        groupByDropdown.disabled = false;
    }   
    updateData();
}

const updateData = () => {
    let selectedCity = cityDropdown.options[cityDropdown.selectedIndex].value;
    let dOneVariable = datasetOneDropdown.options[datasetOneDropdown.selectedIndex].value;
    let dOneText = datasetOneDropdown.options[datasetOneDropdown.selectedIndex].text;
    let dTwoVariable = datasetTwoDropdown.options[datasetTwoDropdown.selectedIndex].value;
    let dTwoText = datasetTwoDropdown.options[datasetTwoDropdown.selectedIndex].text;
    let groupVariable = groupByDropdown.options[groupByDropdown.selectedIndex].value;

    fetchData(selectedCity, dOneVariable, dOneText, dTwoVariable, dTwoText, groupVariable);
}

const fetchData = async (cityName, dOne, dOneText, dTwo, dTwoText, groupBy) => {
    let response = await fetch(`/city/${cityName}/dOne/${dOne}/dTwo/${dTwo}/group/${groupBy}`).then(res => res.json());

    console.log(response);
    let source = response.datafrom;
    switch (source) {
        case 1:
            break;
        case 2:
            break;
        case 3:
            let labelArray = [];
            let dataLablArray = [];
            let alldata = [];

            response.ldist.forEach(data => {
                labelArray.push(data[groupBy]);
            });
            response.ddist.forEach(data => {
                dataLablArray.push(data[dOne]);
            });

            dataLablArray.forEach(dla => {
                let a = {};
                labelArray.forEach(la => {
                    a[la] = 0;
                });
                alldata[dla] = a;
            });

            response.dataset01.forEach(r => {
                console.log(parseFloat(r.count), response.total);
                alldata[r[dOne]][r[groupBy]] = (parseFloat(r.count) / parseFloat(response.total)).toFixed(2);
            });

            let renamedLabel = renameLabel(labelArray);
            let renamedDataLabel = renameLabel(dataLablArray)
            chartData.labels = renamedLabel;
            chartData.datasets = [];
            let colorSl = 0;
            dataLablArray.forEach(dla => {
                chartData.datasets.push({
                    label: renamedDataLabel[colorSl],
                    data: Object.values(alldata[dla]),
                    backgroundColor: getRandomColor(colorSl)
                });
                colorSl++;
            });

            chart.data = chartData;
            if (currentChartType == 'line') {
                chart.data.datasets.forEach(dataset => {
                    dataset.borderColor = dataset.backgroundColor;
                    dataset.backgroundColor = null;
                });
            }
            chart.update();
            break;
        case 4:
            let tempLabel = [];
            let tempdata = [];
            let colorlist = null;
            response.dataset01.forEach(d => {
                if (d[dOne]) {
                    tempLabel.push(d[dOne]);
                } else {
                    tempLabel.push('N/A');
                }
                tempdata.push((parseFloat(d.count) / parseFloat(response.total)).toFixed(2));
            });

            chartData.labels = tempLabel;
            let percentiledata = tempdata;

            switch (currentChartType) {
                case 'bar':
                    colorlist = null;
                    colorlist = getRandomColor(1);
                    break;
                case 'pie':
                    colorlist = [];
                    for (let i = 0; i < percentiledata.length; i++) {
                        colorlist[i] = getRandomColor(i);
                    }
                    break;
                case 'line':
                    colorlist = null;
                    colorlist = getRandomColor(1);
                    break;
            }

            chartData.datasets = [];
            chartData.datasets[0] = {
                label: dOneText,
                data: percentiledata,
                backgroundColor: colorlist
            };
            chart.data = chartData;
            if (currentChartType == 'line') {
                chart.data.datasets.forEach(dataset => {
                    dataset.borderColor = dataset.backgroundColor;
                    dataset.backgroundColor = null;
                });
            }
            chart.update();
            break;
        case 5:
            response.dataset01.sort((a, b) => {
                if(a[dTwo && b[dTwo]]) {
                    return parseInt(a[dTwo].substring(0,4)) < parseInt(b[dTwo].substring(0,4)) ? -1: 1
                }
            });
            let labels = [];
            let tempData = [];
            response.dataset01.forEach(data => {
                if(data[dTwo]) {
                    labels.push(parseInt(data[dTwo].substring(0,4)));
                    tempData.push(parseInt(data.count)/response.total);
                }
            });
            chartData.labels = labels[labels.length-1] ?  labels : labels.splice(-1, 1);
            chartData.datasets = [];
            chartData.datasets[0] = {
                label: dTwoText,
                data: tempData,
                borderColor: getRandomColor(1)
            };
            chart.data = chartData;
            chart.update();
            break;

    }
}

const renameLabel = (array) => {
    let newArray = [];
    array.forEach(a => {
        if (a) {
            newArray.push(a);
        } else {
            newArray.push('N/A');
        }
    });
    console.log(newArray);
    return newArray;
}

const getPercentage = (dataArray) => {
    var sum = dataArray.reduce(function (a, b) {
        return a + b;
    }, 0);
    var percentArray = [];
    var arrayLength = dataArray.length;
    for (var i = 0; i < arrayLength; i++) {
        var percentValue = Math.round((dataArray[i] / sum) * 100);
        percentArray.push(percentValue);
    }
    return percentArray;
}

function getRandomColor(count) {
    let color = ['#003f5c', '#2f4b7c', '#665191', '#a05195', '#d45087', '#f95d6a', '#ff7c43', '#ffa600'];
    return color[count % 8];
}