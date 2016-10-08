// @flow
import React from 'react';
import Papa from 'papaparse'
import  Chart  from './Chart.jsx';
import MonteCarlo from './MonteCarlo.js'
import { workingDaysBetween} from './MonteCarlo.js'
import Dateformat  from 'dateformat'

var headers = ["Work Start", "Work Done", "CycleTime"];

class Excel extends React.Component {
  calculateWorkInProgress(dateTuples){
    var wipByDate = {}
    dateTuples.forEach(range =>{
      var startDate = new Date(range[0].getTime());
      while(startDate < range[1])
      {
        if(wipByDate[startDate] === undefined){
          wipByDate[startDate] = 1;
        }else{
          wipByDate[startDate] = wipByDate[startDate] + 1;
        }
        var newDate = startDate.setDate(startDate.getDate() + 1);
        startDate = new Date(newDate);
      }
      
    })
    var keys = Object.keys(wipByDate);
    var values = keys.map(function(v) { return wipByDate[v]; });
    return values.reduce((a, b) => a+b) / values.length;
  }

  constructor(props){
    super(props);
    this.state = {data: props.initialData, storiesToEstm: 10};
    this.onStoriesToEstmSubmit = this.onStoriesToEstmSubmit.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  runSimulation(){
    var results = new MonteCarlo(this.state.data, this.state.storiesToEstm).runSimulation();
    var data = results.frequencies;
    var the90thPercentile = results.the90thPercentile;
    var wip = this.calculateWorkInProgress(this.state.data);
    return [Math.round(the90thPercentile/wip), Object.keys(data).map((k, i) => [k/wip, data[k]] )]
  }

  handleUpload(e){
    var fr = new FileReader();
    fr.onload = (e) =>{
      var text = e.target.result;
      var data = Papa.parse(text, { delimiter: ','}).data.filter(e => e.length > 1).map((data) => [new Date(data[0]), new Date(data[1] ) ]);
      this.setState({data: data});
      this.runSimulation();
    }
    var file = e.target.files[0];
    fr.readAsBinaryString(file);
  
  }

  onStoriesToEstmSubmit(e){
    e.preventDefault();
    var storiesToEstm =  Number(e.target.firstChild.value);
    this.setState({storiesToEstm: storiesToEstm});
  }

  render(){
    var [the90Percentile, data] = this.runSimulation();
    return React.DOM.div(null, React.DOM.table(null,[
        React.DOM.thead({onClick: this._sort},
          React.DOM.tr(null,
            this.props.headers.map((title, idx) => React.DOM.th({key: idx}, this.state.sortby === idx? title+= this.state.descending? '\u2191': '\u2193': title))
            )),
            React.DOM.tbody(null,this.state.data.map((row, rowidx) => {
             return  React.DOM.tr({key: rowidx},
                row.map((cell, idx) =>
                  {
                    var edit = this.state.edit;
                    var content = cell.toString();
                    return React.DOM.td({key: idx, 'data-row': rowidx}, Dateformat(content, 'yyyy-mm-dd'))
                  }), <td>{ workingDaysBetween(row[0],row[1]) } days </td>
                )
            }))

      ]),
      <p><label for='cycle_times'>Upload cycle times form csv(format: StoryIdentifier, WorkStartDate(YYYY-MM-DD), WorkEndDate):</label></p>,
      React.DOM.input({
        id: "cycle_times",
        type: 'file',
        name: "upload_file",
        className: 'cycle_times',
        onChange: this.handleUpload,
      }),
      <p>How many stories you have to estimate: <form onSubmit={this.onStoriesToEstmSubmit} ><input type='text' defaultValue={"10"}/></form></p> ,
    <Chart data = { data }></Chart>,
      <div><h3>The 90th Percentile: {the90Percentile}</h3><p>The 90th Percentile represents the amount of days needed to complete given stories with 90% certainty </p></div>
        );
  }
}
Excel.propTypes = {
  headers: React.PropTypes.arrayOf(React.PropTypes.string),
  initialData: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.string)),
  sortby: null,
  descending: false,
  edit: null,
  workInProgress: 0,
  storiesToEstm: React.PropTypes.number,
}
export default Excel;
