import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Nav, NavItem, Navbar } from 'react-bootstrap';
import Routes from './Routes';
import RouteNavItem from './components/RouteNavItem';

import './App.css';

import { getNextGeneration } from './drills/gameOfLife/life';

class App extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="App container">
        <header className="App-header">
          <h1 className="App-title">Practice Hub</h1>
        </header>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Practice Hub</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {
              [
              <RouteNavItem key={ 1 } href="/gameOfLife">
                Game of Life
              </RouteNavItem>
              ]
            }
          </Nav>
        </Navbar.Collapse>
        </Navbar>
        <Routes childProps={ childProps } />
      </div>
    );
  }
}

export default App;
