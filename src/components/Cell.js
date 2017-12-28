import React, { Component } from 'react';

import '../css/gameOfLife/gameOfLife.css';

export default class Cell extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  render() {
    return (
      <div key={ this.props.key }
        style={ this.props.cellStyle }
        className={ this.props.classname }
        onClick={ this.handleClvcick }
      >
        <div className="hide">
        { this.props.text }
        </div>
      </div>
    )
  }

  handleClick(e) {
    e.preventDefault()
    this.props.callback()
  }


}
