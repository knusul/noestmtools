import React from 'react';

const ReactHighcharts = require('react-highcharts');

class Chart extends React.Component{
  render(){
   return  <ReactHighcharts config = {this.chartConfig()}></ReactHighcharts>
  }
  constructor(props){
    super(props);
    this.state = { data: props.data };
  }
  chartConfig() {
    var data = this.state.data;
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
            text: 'Count'
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }]
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
