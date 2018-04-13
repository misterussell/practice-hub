import React, { Component } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import PropTypes from 'prop-types';

export default class StackedAreaChart extends Component {
  static propTypes = {
    data: PropTypes.array
  }

  render() {
    return (
      <AreaChart
        width={500}
        height={300}
        data={ this.props.data }
        margin={{ top: 0, right: 0, left: 0, bottom: 0}} >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type='monotone' dataKey='dead' stackID="1" stroke='#8884d8' fill='#C32900' />
        <Area type='monotone' dataKey='alive' stackID="1" stroke='#82ca9d' fill='#008B3C' />
      </AreaChart>
    );
  }
}
