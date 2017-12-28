import React, { Component } from 'react';

export default class Button extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <button onClick={ this.handleClick }>
        { this.props.text }
      </button>
    );
  }

  handleClick(e) {
    e.preventDefault();
    this.props.callback();
  }
}
