import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../css/gameOfLife/gameOfLife.css'

export default class Grid extends Component {
  static propTypes = {
    width: PropTypes.number,
    gridTemplateColumns: PropTypes.string,
    gridTemplateRows: PropTypes.string,
    classname: PropTypes.string,
    children: PropTypes.array
  }

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
