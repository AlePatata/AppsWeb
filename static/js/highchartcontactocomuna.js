Highcharts.chart('container', {
  chart: {
      type: 'bar'
  },
  title: {
      text: 'Contactos por Comuna en Chile'
  },
  xAxis: {
      categories: [], 
      title: {
          text: null
      }
  },
  yAxis: {
      min: 0,
      title: {
          text: 'Número de Contactos',
          align: 'high'
      }
  },
  tooltip: {
      valueSuffix: ' contactos'
  },
  series: [{
      name: 'Contactos',
      data: [] 
  }]
});

fetch("http://127.0.0.1:5000/datos-contacto-comuna")
.then((response) => response.json())
.then((data) => {
  // Extraemos categorías y datos para la serie
  let categorias = data.map(item => item.name); // Obtenemos los nombres de las comunas
  let dataParseada = data.map(item => item.y); // Obtenemos los números de contactos
  console.log(data)
  const chart = Highcharts.charts.find(
    (chart) => chart && chart.renderTo.id === "container"
  );

  // Actualizamos el gráfico con las nuevas categorías y datos
  chart.update({
    xAxis: {
      categories: categorias
    },
    series: [{
      name: 'Contactos',
      data: dataParseada
    }]
  });
})
.catch((error) => console.error("Error:", error));
