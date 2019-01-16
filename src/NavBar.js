import React, { Component } from 'react';
//import './Navbar.css';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledNav = styled.nav`
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: skyblue;
  padding: 10px 0px;
`;

const StyledNavLink = styled(NavLink)`
  color: white;
  background-color: skyblue;
  margin: 5px 10px;
  text-decoration: none;

  &:hover {
    background-color: gray;
  }

  &.active {
    font-weight: 800;
  }
`;

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StyledNav>
        <div>
          <StyledNavLink exact to="/">
            Home
          </StyledNavLink>
        </div>
        <div>
          <StyledNavLink exact to="/companies">
            Companies
          </StyledNavLink>
          <StyledNavLink exact to="/jobs">
            Jobs
          </StyledNavLink>
          <StyledNavLink exact to="/profile">
            Profile
          </StyledNavLink>
          <StyledNavLink exact to="/login">
            Login
          </StyledNavLink>
        </div>
      </StyledNav>
    );
  }

  state = {};
}

Navbar.propTypes = {};

Navbar.defaultProps = {};

export default Navbar;
