import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import '../css/Button.css';

export default class Button extends Component {
  static propTypes = {
    classname: PropTypes.string,
    text: PropTypes.string,
    handleClick: PropTypes.func
  }

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <button onClick={ this.handleClick }
        className={ this.props.classname }>
        { this.props.text }
      </button>
    );
  }

  handleClick(e) {
    e.preventDefault();
    this.props.callback();
  }
}
