import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import '../css/gameOfLife/gameOfLife.css'

export default class Grid extends Component {
  static propTypes = {
    width: PropTypes.number,
    gridTemplate: PropTypes.string,
    classname: PropTypes.string,
    children: PropTypes.array
  }

  render() {
    let gridStyle = {
      display: 'grid',
      width: this.props.width,
      gridTemplateColumns: `${ this.props.gridTemplate }`,
      gridTemplateRows: `${ this.props.gridTemplate }`
    }

    return (
      <div className={ this.props.classname } style={ gridStyle }>
        { this.props.children }
      </div>
    )
  }
}
