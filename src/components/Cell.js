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
  }

  constructor() {
    super();
    this.state = {
      cellStyle: {}
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setState((prevState, props) => {
      const colour = props.cellState === 0 ? 'aliceblue' : '#5E59E1';
      return {
        cellStyle: { ...props.cellStyle, background: colour }
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.cellState !== this.props.cellState) {
      this.setState((prevState, props) => {
        const colour = props.cellState === 0 ? 'aliceblue' : '#5E59E1';
        return {
          cellStyle: { ...props.cellStyle, background: colour }
        }
      });
    }
  }
  render() {
    return (
      <div
        style={ this.state.cellStyle }
        className={ this.props.classname }
        onClick={ this.handleClick }
      >
        <div className="hide">
        { this.props.text }
        </div>
      </div>
    );
  }

  handleClick(e) {
    e.preventDefault()
    this.props.callback !== null ? this.props.callback(this.props.cellNumber) : null;
  }

}
