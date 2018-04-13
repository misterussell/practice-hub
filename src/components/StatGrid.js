import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from './Grid';
import StatCell from './StatCell';

export default class StatGrid extends Component {
  static propTypes = {
    data: PropTypes.array,
    gridSettings: PropTypes.object
  }

  constructor(...args) {
    super(...args);

    this.state = {
      rangeObj: {}
    };
  }

  componentWillMount() {
    this.setState((prevState) => {
      return { rangeObj: this.getRange() };
    });
  }

  render() {
    let cells = this.props.data.map((cell, i) => {
      return (
        <StatCell key={ i }
          value={ cell }
          type={ this.props.type === 'alive' ? 'alive' : 'dead' }
          shade={ cell === 0 ? 1 : this.state.rangeObj[cell] } />
      );
    });

    return (
      <Grid
        classname={ this.props.gridSettings.classname }
        width={ this.props.gridSettings.width }
        gridTemplate={ this.props.gridSettings.gridTemplate }>
          { cells }
      </Grid>
    );
  }

  getRange() {
    let rangeObj = {};
    [...new Set([...this.props.data].sort((a, b) => b - a))]
      .forEach((val, i) => {
        return rangeObj[val] = Number(`0.${i}`);
      });
    return rangeObj;
  }
}
