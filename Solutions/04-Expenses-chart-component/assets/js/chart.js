const ctx = document.querySelector(".card-chart").getContext('2d');

// Change chart defaults styles
Chart.defaults.font.size = 11
Chart.defaults.font.family = "DM Sans"
Chart.defaults.color = "hsl(28, 10%, 53%)"

const data = {
  labels: [],
  datasets: [{
    data: [],
    backgroundColor: [
      "hsl(10, 79%, 65%)",
      "hsl(10, 79%, 65%)",
      "hsl(186, 34%, 60%)",
      "hsl(10, 79%, 65%)",
      "hsl(10, 79%, 65%)",
      "hsl(10, 79%, 65%)",
      "hsl(10, 79%, 65%)"
    ],
    hoverBackgroundColor: [
      "hsl(10, 100%, 76%)",
      "hsl(10, 100%, 76%)",
      "hsl(187, 49%, 80%)",
      "hsl(10, 100%, 76%)",
      "hsl(10, 100%, 76%)",
      "hsl(10, 100%, 76%)",
      "hsl(10, 100%, 76%)"
    ],
    borderWidth: 1,
    borderRadius: 4,
    // Add border radius on bottom side of bar
    borderSkipped: true,
    // Bars width
    barThickness: 33
  }]
}

const config = {
  type: "bar",
  data,
  options: {
    // Disable aspect ratio
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        cornerRadius: 3,
        // Tooltip arrow size
        caretSize: 0,
        displayColors: false,
        bodyFont: {
          size: 12
        },
        padding: 6,
        // Tooltip position
        yAlign: "bottom",
        titleAlign: "center",
        caretPadding: 7,
        titleColor: "hsl(30, 100%, 98%)",
        backgroundColor: "hsl(25, 47%, 15%)",
        callbacks: {
          // Hide tooltip title
          title: function () { },

          // Add $ sign before tooltip value
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
            }
            return label;
          }
        }
      },

      // Hide Legend
      legend: {
        display: false
      }
    },

    scales: {
      // Hide x direction lines & border axis
      x: {
        grid: {
          display: false,
          drawBorder: false
        }
      },
      // Hide y direction lines & border axis
      y: {
        grid: {
          display: false,
          drawTicks: false,
          drawBorder: false
        },
        // Hide chart left side ticks
        ticks: {
          display: false,
        }
      }
    }
  }
}

// Chart builder
const myChart = new Chart(ctx, config)


// ---- This section for get data from json file and show on chart ----

const loadData = () => {
  // Create Fetch request, and send data to addFunc function
  fetch("data.json")
    .then(response => response.json())
    .then(dataCh => {
      dataCh.forEach(addFunc)
    })
}

// After received data from json file, update the chart data
// Remember: with looping on datasets array, we having the access to array or data available in the datasets array
function addFunc(chart) {
  config.data.labels.push(chart.day)
  config.data.datasets.forEach((datasetData) => {
    datasetData.data.push(chart.amount)
  })
  myChart.update()
}

// Call loadData function
window.addEventListener("load", loadData)


// ---- This section for change chart data by according window resolution ----
// Check after the change window resolution
const updateFunc = () => {
  config.data.datasets.forEach((datasetData) => {
    if (window.innerWidth >= 600) {
      datasetData.barThickness = 45
      datasetData.borderRadius = 6
    } else {
      datasetData.barThickness = 33
      datasetData.borderRadius = 4
    }
  })

  if (window.innerWidth >= 600) {
    Chart.defaults.font.size = 13
    config.options.plugins.tooltip.cornerRadius = 5
    config.options.plugins.tooltip.bodyFont.size = 16
    config.options.plugins.tooltip.padding = 8
  } else {
    Chart.defaults.font.size = 11
    config.options.plugins.tooltip.cornerRadius = 3
    config.options.plugins.tooltip.bodyFont.size = 12
    config.options.plugins.tooltip.padding = 6
  }

  myChart.update()
}

// Call updateFunc function
window.addEventListener("resize", updateFunc)


// Check before the change window resolution
config.data.datasets.forEach((datasetData) => {
  if (window.innerWidth >= 600) {
    datasetData.barThickness = 44
    datasetData.borderRadius = 6
  } else {
    datasetData.barThickness = 33
    datasetData.borderRadius = 4
  }

  if (window.innerWidth >= 600) {
    Chart.defaults.font.size = 13
    config.options.plugins.tooltip.cornerRadius = 5
    config.options.plugins.tooltip.bodyFont.size = 16
    config.options.plugins.tooltip.padding = 8
  } else {
    Chart.defaults.font.size = 11
    config.options.plugins.tooltip.cornerRadius = 3
    config.options.plugins.tooltip.bodyFont.size = 12
    config.options.plugins.tooltip.padding = 6
  }

  myChart.update()
})