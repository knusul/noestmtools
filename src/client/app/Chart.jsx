import React from 'react';

const ReactHighcharts = require('react-highcharts');

class Chart extends React.Component{
  render(){
   return  <ReactHighcharts config = {this.chartConfig()}></ReactHighcharts>
  }
  constructor(props){
    console.log("construct");
    super(props);
  }
  chartConfig() {
    var data = this.props.data;
    return {
      title: {
        text: 'Time forecast',
          x: -20 //center
      },
        subtitle: {
          text: 'based on Monte Carlo method',
          x: -20
        },
        yAxis: {
          title: {
            text: ''
          },
          lineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: 'transparent',
          labels: {
              enabled: false
          },
          minorTickLength: 0,
          tickLength: 0
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          borderWidth: 0
        },
        series: [{
          name: 'Time',
          data: data,
        }]
    }
  }
}
export default Chart;
