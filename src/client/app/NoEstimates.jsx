import React from 'react';
import  Chart  from './Chart.jsx';
import MonteCarlo from './MonteCarlo.js'

var headers = ["Work Start", "Work Done", "CycleTime"];

class Excel extends React.Component {
  toDays(miliseconds){
    return miliseconds / 1000 / 60 / 60 / 24
  }

  constructor(props){
    super(props);
    this.state = {data: props.initialData};
    this._sort = this._sort.bind(this);
    this._showEditor = this._showEditor.bind(this);
    this._save = this._save.bind(this);
    this.chartData = new MonteCarlo(this.state.data).getData()
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
                  }), <td>{ this.toDays(row[1]-row[0]) } </td>
                )
            }))

      ]),
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
