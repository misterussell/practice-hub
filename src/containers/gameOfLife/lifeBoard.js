import React, { Component } from 'react';

export default class GameOfLife extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lifeBound: [5, 5],
      cells: []
    }
  }

  render() {
    let cells = Array.from(new Array(10), (i, t) => <div key={ t } onClick={ this.handleSelect }>cell</div>);
    return (
      <div className="LifeBoard">
        A board and related settings bars will be rendered here.
        { cells }
      </div>
    );
  }

  handleSelect(e) {


  }
}
