import React from 'react';
import Papa from 'papaparse'
import  Chart  from './Chart.jsx';
import MonteCarlo from './MonteCarlo.js'

var headers = ["Work Start", "Work Done", "CycleTime"];

class Excel extends React.Component {
  calculateWorkInProgress(data){
    var wipByDate = {}
    data.forEach(range =>{
      var startDate = range[0];
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
    this.state = {data: props.initialData};
    this._sort = this._sort.bind(this);
    this._showEditor = this._showEditor.bind(this);
    this._save = this._save.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.runSimulation();
  }

  runSimulation(){
    this.monteCarlo = new MonteCarlo(this.state.data);
    var data = this.monteCarlo.getData(); 
    var wip = this.calculateWorkInProgress(this.state.data);
    this.chartData = Object.keys(data).map((k, i) => [k/wip, data[k]] )
  }

  calculateDeviation(array){
    var sum = array.reduce((sum, value) => sum + value, 0);
    return sum/array.length
  }

  _save(e){
    e.preventDefault();
    var input =  e.target.firstChild;
    var data =this.state.data.slice();
    data[this.state.edit.row][this.state.edit.cell] = input.value;
    this.setState({edit: null, data: data})
  }

  _sort(e){
    var descending = this.state.sortby === column && !this.state.descending;
    var column = e.target.cellIndex;
    var data = this.state.data.slice()
    data.sort((a,b) =>{
      return descending
      ? a[column] > b[column] ? 1: -1
      : a[column] < b[column] ? 1: -1
    });
    this.setState({data: data, sortby: column, descending: descending});
  }
  _showEditor(e){
    var edit = {edit: {row: parseInt(e.target.dataset.row, 10), cell: e.target.cellIndex} }
    this.setState(edit)
  }

  handleUpload(e){
    var fr = new FileReader();
    fr.onload = (e) =>{
      var text = e.target.result;
      var data = Papa.parse(text, { delimiter: ','}).data.map((data) => [new Date(data[0]), new Date(data[1] ) ]);
      this.setState({data: data});
      this.runSimulation();
    }
    var file = e.target.files[0];
    fr.readAsBinaryString(file);
  
  }

  render(){
    return React.DOM.div(null, React.DOM.table(null,[
        React.DOM.thead({onClick: this._sort},
          React.DOM.tr(null,
            this.props.headers.map((title, idx) => React.DOM.th({key: idx}, this.state.sortby === idx? title+= this.state.descending? '\u2191': '\u2193': title))
            )),
            React.DOM.tbody({onDoubleClick: this._showEditor},this.state.data.map((row, rowidx) => {
             return  React.DOM.tr({key: rowidx},
                row.map((cell, idx) =>
                  {
                    var edit = this.state.edit;
                    var content = cell.toString();
                    if( edit && edit.row === rowidx && edit.cell === idx)
                    {
                      content = React.DOM.form({onSubmit: this._save},
                        React.DOM.input({type: 'text', defaultValue: content})
                        )
                    }
                    return React.DOM.td({key: idx, 'data-row': rowidx}, content)
                  }), <td>{ this.monteCarlo.workingDaysBetween(row[0],row[1]) } </td>
                )
            }))

      ]),
      React.DOM.input({
        type: 'file',
        name: "upload_file",
        className: 'cycle_times',
        onChange: this.handleUpload,
      }),
    <Chart data = {this.chartData }></Chart>
        );
  }
}
Excel.propTypes = {
  headers: React.PropTypes.arrayOf(React.PropTypes.string),
  initialData: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.string)),
  sortby: null,
  descending: false,
  edit: null,
  chartData: [],
  workInProgress: 0,
}
export default Excel;
