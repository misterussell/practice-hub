import React, { Component } from 'react';

import '../css/Button.css';

export default class Button extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <button onClick={ this.handleClick }
        className={ this.props.class }>
        { this.props.text }
      </button>
    );
  }

  handleClick(e) {
    e.preventDefault();
    this.props.callback();
  }
}
