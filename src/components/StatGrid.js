import React, { Component } from 'react';

export default class StatGrid extends Component {
  componentWillMount() {
    console.log(this.props.data);
  }
  render() {

    let style = {
      display: `grid`,
      'grid-template-columns': `50px 50px 50px 50px 50px`,
      'grid-template-rows': `50px 50px 50px 50px 50px`,
      width: `250px`,
      margin: `0 auto`,
      padding: `10px`
    }

    let cells = this.props.data.map((cell, i) => {
      return (
        <div key={ i }>
          {cell}
        </div>
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
}
