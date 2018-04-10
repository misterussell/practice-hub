import React, { Component } from 'react';

export default class StatGrid extends Component {
  componentWillMount() {
    console.log(this.props.data);
  }
  render() {
    let cells = this.props.data.map((cell, i) => {
      return <div key={ i }>
        <h1>cell</h1>
      </div>
    });

    return (
      <div>
        { cells }
      </div>
    );
  }
}
