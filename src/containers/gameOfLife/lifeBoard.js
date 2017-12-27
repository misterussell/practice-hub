import React, { Component } from 'react';

export default class GameOfLife extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="LifeBoard">
        A board and related settings bars will be rendered here.
      </div>
    );
  }
}
