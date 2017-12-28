import React, { Component } from 'react';

import '../css/gameOfLife/gameOfLife.css'

export default class Grid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bound: this.getGridSize()
    }
  }

  componentWillMount() {
    console.log(this.getGridSize());
  }

  render() {
    let gridStyle = {
      width: this.props.width,
      gridTemplateColumns: this.state.bound,
      gridTemplateRows: `${ this.props.width / this.props.bound }px`
    }
    return (
      <div className="life-board" style={ gridStyle }>
        { this.props.children }
      </div>
    )
  }

  getGridSize() {
    let gridTemplateCols = Array.from(new Array(this.props.bound), () => {
      return `${ this.props.width / this.props.bound }px`
    })
    return gridTemplateCols.join(' ');
  }
}
