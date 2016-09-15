
import React from 'react';
import {render} from 'react-dom';
import {findDOMNode} from 'react-dom';
import Excel from './NoEstimates.jsx';

var headers = ["Work Start", "Work Done", "CycleTime"];
var data = [
  [new Date("2016/08/24"), new Date("2016/08/25")],
  [new Date("2016/08/12"), new Date("2016/08/26")],
  [new Date("2016/08/08"), new Date("2016/08/12")],
  [new Date("2016/08/09"), new Date("2016/08/17")],
  [new Date("2016/08/05"), new Date("2016/08/26")],
  [new Date("2016/07/28"), new Date("2016/08/04")],
  [new Date("2016/08/03"), new Date("2016/08/10")],
  [new Date("2016/07/28"), new Date("2016/08/16")],
  [new Date("2016/07/22"), new Date("2016/07/22")],
];

render(<Excel headers = {headers}  initialData= {data} />,
    document.getElementById('app'));
