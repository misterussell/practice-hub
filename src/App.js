import React, { Component } from 'react';
import './App.css';

import life from './drills/gameOfLife/life';

class App extends Component {
  render() {
    this.logTest();
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Practice Hub</h1>
        </header>
        <p className="App-intro">
          A hub to practice and version control JavaScript Drills
        </p>
      </div>
    );
  }

  logTest() {
    let gen = [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]
    ];

    console.log(life.getNextGeneration(gen, 1));
  }
}

export default App;
