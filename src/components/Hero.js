import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Button from './Button';

import Store from '../Store';

export default class Hero extends Component {
  static propTypes = {
    stats: PropTypes.object,
    gridSettings: PropTypes.object
  }

  componentWillUnmount() {
    Store.tracking.clearStats();
  }

  render() {

    return (
      <Jumbotron>
        <h1>Game Over.</h1>
        <p>
          Your cells lasted { this.props.stats.generationStats.lifeSpan } generations.
        </p>
        <p>
        <Link to={{
          pathname:'/stats/gameOfLife',
          state: {
            stats: this.props.stats,
            gridSettings: this.props.gridSettings,
            type: 'GOLstats'
          }
        }}>
          <Button
            callback={ null }
            classname={ 'game-button' }
            text={ 'Click here to see more stats.' }
          />
        </Link>
        <Button
          callback={ this.props.close }
          classname={ 'game-button' }
          text={ 'Click here to play again.' }
        />
        </p>
      </Jumbotron>
    );
  }
};
