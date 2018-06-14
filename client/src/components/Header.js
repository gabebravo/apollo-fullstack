import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

export const Header = () => (
  <div>
    <Navbar className="header-color" light expand>
      <NavbarBrand style={{ color: '#fff', fontSize: '2rem' }} href="/">Dream Team Builder</NavbarBrand>
    </Navbar>
  </div>
)

export default Header;