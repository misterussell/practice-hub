import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class StatCell extends Component {
  static propTypes = {
    value: PropTypes.number,
    type: PropTypes.string
  }

  render() {
    const colour = this.props.type === 'alive' ? '#008B3C' : '#C32900';

    let style = {
      background: `${this.getColour(colour)}`,
      borderRadius: '.5vw',
      margin: '2px 2px 2px 2px',
      border: `solid 1px ${colour}`
    }

    return (
      <div
        style={ style }>
        { this.props.value }
      </div>
    );
  }

  getColour(color) {
    // using this shader as my basis https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
    // calculate the shade based on float int for percent
    let percent = this.props.shade;
    // convert hexadecimal string to number
    const f = parseInt(color.slice(1),16)
    // if the percent is negative make the tone darker
    const t = percent < 0 ? 0 : 255;
    // if the percent is less than zero calulate the negative hex value
    const p = percent < 0 ? percent * - 1 : percent;
    // shift off R bits
    const R = f >> 16;
    // shift off G bits
    const G = f >> 8 & 0x00FF;
    // return 1's for B bits if they match base structure
    const B = f & 0x0000FF;
    // return computed hex WITH hash
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
  }
}
