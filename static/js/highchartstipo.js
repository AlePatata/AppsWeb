Highcharts.chart('container', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Cantidad de Tipos'
    },
    xAxis: {
        tipos: [],
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Cantidad',
            align: 'high'
        }
    },
    tooltip: {
      valueSuffix: ' dispositivos'
    },
    series: [{
        name: 'Dispositivos',
        data: []
    }]
});

fetch("http://127.0.0.1:5000/datos-tipo")
  .then((response) => response.json())
  .then((data) => {
    console.log(data)

    let tipos = data.map(item => item.tipo);
    let dataParseada = data.map(item => item.y);

    // Get the chart by ID
    const chart = Highcharts.charts.find(
      (chart) => chart && chart.renderTo.id === "container"
    );

    // Update the chart with new data
    chart.update({
      xAxis: {
        tipos: tipos
      },
      series: [{
        name: 'Dispositivos',
        data: dataParseada
      }]
    });
  })
  .catch((error) => console.error("Error:", error));
