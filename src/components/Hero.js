import React, { Component } from 'react';
import { JumboTron } from 'react-bootstrap';

export default class Hero extends Component {
  constructor(...args) {
    super(...args);
  }

  componentWillMount() {

  }

  render() {
    return (
      <Jumbotron>
        <h1>Game Over.</h1>
        <p>
          Your life lasted
        </p>
        <p>
          <Button bsStyle="primary">Learn more</Button>
        </p>
      </Jumbotron>;
    )
  }
};
