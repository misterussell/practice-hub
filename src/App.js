import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Routes from './Routes';

class App extends Component {

  render() {

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
            <LinkContainer to="/gameOfLife">
              <NavItem eventKey={1}>
                Game Of Life
              </NavItem>
            </LinkContainer>
            <LinkContainer to='/fooBar'>
              <NavItem eventKey={2}>
                Foo Bar
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes />
    </div>
  );
  }
}

export default App;
