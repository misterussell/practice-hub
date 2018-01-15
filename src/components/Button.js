import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types';

// import '../css/Button.css';

export default class GameButton extends Component {
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
      <Button
        onClick={ this.handleClick }
        bsStyle="primary"
      >
        { this.props.text }
      </Button>
    );
  }

  handleClick(e) {
    e.preventDefault();
    this.props.callback();
  }
}
