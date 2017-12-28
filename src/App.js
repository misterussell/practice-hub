import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import Routes from './Routes';
import RouteNavItem from './components/RouteNavItem';

import './css/App.css';

class App extends Component {

  render() {

    const childProps = {};

    return (
      <div className="App container">
      <Navbar fluid collapseOnSelect>
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
                <RouteNavItem key={1} href="/gameOfLife">
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
