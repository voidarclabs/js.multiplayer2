// Import the required libraries
const os = require('os-utils');
const netstat = require('node-netstat');
const Chart = require('chart.js');

// Get the canvas element from the HTML document
const canvas = document.getElementById('usage-graph');

// Create a new Chart object with the canvas element
const chart = new Chart(canvas, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'CPU Usage',
            data: [],
            borderColor: 'red',
            fill: false
        }, {
            label: 'Network Usage',
            data: [],
            borderColor: 'blue',
            fill: false
        }, {
            label: 'Drive Usage',
            data: [],
            borderColor: 'green',
            fill: false
        }]
    }
});

// Update the chart every second
setInterval(() => {
    // Get the current CPU usage
    os.cpuUsage((value) => {
        // Add the CPU usage data to the chart
        chart.data.datasets[0].data.push(value * 100);
    });

    // Get the current network usage
    netstat({
        filter: {
            state: 'ESTABLISHED'
        }
    }, (data) => {
        // Add the network usage data to the chart
        chart.data.datasets[1].data.push(data.bytesSent + data.bytesRecv);
    });

    // Get the current drive usage
    const totalSpace = os.totalmem();
    const freeSpace = os.freemem();
    const usedSpace = totalSpace - freeSpace;
    const driveUsage = (usedSpace / totalSpace) * 100;

    // Add the drive usage data to the chart
    chart.data.datasets[2].data.push(driveUsage);

    // Add a new label to the chart
    chart.data.labels.push('');

    // Update the chart
    chart.update();
}, 1000);
