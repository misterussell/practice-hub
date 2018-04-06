import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Button from './Button';

export default class Hero extends Component {
  static propTypes = {
    stats: PropTypes.object
  }

  constructor(...args) {
    super(...args);
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {

    return (
      <Jumbotron>
        <h1>Game Over.</h1>
        <p>
          Your cells lasted { this.props.lifeSpan } generations.
        </p>
        <p>
        <Link to={{
          pathname:'/test'
        }}>
          <Button
            callback={ null }
            classname={ 'game-button' }
            text= { 'Click here to see more stats.' }
          />
        </Link>
        </p>
      </Jumbotron>
    );
  }
};
