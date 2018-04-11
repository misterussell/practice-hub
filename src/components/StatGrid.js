import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StatCell from './StatCell';

export default class StatGrid extends Component {
  static propTypes = {
    data: PropTypes.array
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

    let style = {
      display: `inline-grid`,
      gridTemplateColumns: `50px 50px 50px 50px 50px`,
      gridTemplateRows: `50px 50px 50px 50px 50px`,
      width: `250px`,
      margin: `0 auto`,
      padding: `10px`
    }

    let cells = this.props.data.map((cell, i) => {
      return (
        <StatCell key={ i }
          value={ cell }
          type={ this.props.type === 'alive' ? 'alive' : 'dead' }
          shade={ cell === 0 ? 1 : this.state.rangeObj[cell] } />
      );
    });

    return (
      <div
        className="stat-grid"
        style={ style } >
          { cells }
      </div>
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
