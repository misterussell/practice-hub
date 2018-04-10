import React, { Component } from 'react';
import { RadialBarChart, RadialBar, Legend, Tooltip } from 'recharts';

export default class RadialBars extends Component {
  render() {
    return (
      <RadialBarChart
        width={500}
        height={250}
        innerRadius="10%"
        outerRadius="80%"
        data={ this.props.data }
        startAngle={180}
        endAngle={0}
        >
        <RadialBar
          minAngle={15}
          label={{ fill: '#666', position: 'insideStart' }}
          background clockWise={true}
          dataKey={ this.props.dataKey } />
        <Legend
          iconSize={10}
          width={120}
          height={140}
          layout='vertical'
          verticalAlign='middle'
          align="right" />
        <Tooltip />
      </RadialBarChart>
    );
  }
}
