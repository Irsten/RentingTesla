import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  render() {
    return (
      <header>
        <Navbar
          className='navbar-expand-sm ng-white border-bottom box-shadow'
          container
          light
        >
          <NavbarBrand tag={Link} to='/'>
            RentingTesla
          </NavbarBrand>
          <ul className='navbar-nav flex-grow'>
            <NavItem>
              <NavLink tag={Link} to='/'>
                Home
              </NavLink>
            </NavItem>
          </ul>
        </Navbar>
      </header>
    );
  }
}
