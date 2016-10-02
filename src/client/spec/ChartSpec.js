import React from 'react';
import { mount, shallow } from 'enzyme';
import Chart from '../app/Chart.jsx';

describe('<Chart />', () => {

  it('calls componentDidMount', () => {
    const wrapper = mount(<Chart />);
    console.log(wrapper);
  });
});
