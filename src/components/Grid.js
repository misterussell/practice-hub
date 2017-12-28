import React, { Component } from 'react';

import '../css/gameOfLife/gameOfLife.css'

export default class Grid extends Component {

  render() {
    let gridStyle = {
      width: this.props.width,
      gridTemplateColumns: `${ this.props.gridSettings }`,
      gridTemplateRows: `${ this.props.gridSettings }`
    }

    return (
      <div className={ this.props.classname } style={ gridStyle }>
        { this.props.children }
      </div>
    )
  }
}
