import React, { Component } from 'react';

import '../css/gameOfLife/gameOfLife.css'

export default class Grid extends Component {

  render() {
    let gridStyle = {
      width: this.props.width,
      gridTemplateColumns: `${this.props.cols}`,
      gridTemplateRows: `${ this.props.width / this.props.bound }px`
    }

    return (
      <div className="life-board" style={ gridStyle }>
        { this.props.children }
      </div>
    )
  }
}
