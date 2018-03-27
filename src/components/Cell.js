import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import '../css/gameOfLife/gameOfLife.css';

export default class Cell extends Component {
  static propTypes = {
    cellState: PropTypes.number,
    cellStyle: PropTypes.object,
    classname: PropTypes.string,
    text: PropTypes.string,
    cellNumber: PropTypes.number
  };

  constructor(...args) {
    super(...args);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      classname: 'cell'
    };
  };

  componentDidMount() {
    this.setState((prevState, props) => {
      const classname = props.cellState === 0 ? 'cell' : 'cell active';
      return {
        classname
      };
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.cellState !== this.props.cellState) {
      this.setState((prevState, props) => {
        const classname = props.cellState === 0 ? 'cell' : 'cell active';
        return {
          classname
        };
      });
    };
  };

  render() {
    return (
      <div
        style={ this.state.cellStyle }
        className={ this.state.classname }
        onClick={ this.handleClick }
      >
        <div className="hide">
          { this.props.text }
        </div>
      </div>
    );
  };

  handleClick(e) {
    e.preventDefault();
    return this.props.callback !== null ? this.props.callback(this.props.cellNumber) : null;
  };

};
