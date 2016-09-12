
import React from 'react';
import {render} from 'react-dom';
import {findDOMNode} from 'react-dom';
import Excel from './NoEstimates.jsx';

var headers = ["Work Start", "Work Done", "CycleTime"];
var data = [
  [new Date("2016/06/01"), new Date("2016/06/04")],
  [new Date("2016/06/04"), new Date("2016/06/010")],
  [new Date("2016/06/03"), new Date("2016/06/04")],
  [new Date("2016/06/05"), new Date("2016/06/010")],
  [new Date("2016/06/07"), new Date("2016/06/015")],
  [new Date("2016/06/04"), new Date("2016/06/06")],
];

render(<Excel headers = {headers}  initialData= {data} />,
    document.getElementById('app'));
