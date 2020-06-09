import React, { Component } from "react";
import { NavLink as Link } from "react-router-dom";

import "../index.css";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleNavbarOnClick = () => {
    if (window.innerWidth <= 989) {
      return this.toggle();
    }
  };

  userIsAuthenticatedEmail() {
    if (this.props.authenticated) {
      return [
        <UncontrolledDropdown
          nav
          className="nav-item dropdown"
          key="email-auth"
        >
          <DropdownToggle nav caret className="nav-link">
            Account
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu">
            <DropdownItem className="inverse-dropdown">
              <span key="signout" onClick={this.props.logoutAction}>
                <NavLink
                  tag={Link}
                  to="/signout"
                  onClick={this.toggleNavbarOnClick}
                >
                  Log out
                </NavLink>
              </span>
            </DropdownItem>
            <DropdownItem className="inverse-dropdown">
              <NavLink
                tag={Link}
                to="/changepassword"
                onClick={this.toggleNavbarOnClick}
              >
                Change Password
              </NavLink>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      ];
    }
  }

  userIsNotAuthenticated() {
    if (!this.props.authenticated) {
      return [
        <UncontrolledDropdown nav className="nav-item dropdown" key="not-auth">
          <DropdownToggle nav caret className="nav-link">
            Login
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu">
            <DropdownItem className="inverse-dropdown">
              <NavLink
                tag={Link}
                to="/login"
                key="log-in"
                activeClassName="active"
                exact
                onClick={this.toggleNavbarOnClick}
              >
                Site Log in
              </NavLink>
            </DropdownItem>
            <DropdownItem className="inverse-dropdown">
              <NavLink
                tag={Link}
                to="/register"
                key="sign-up"
                activeClassName="active"
                exact
                onClick={this.toggleNavbarOnClick}
              >
                Register
              </NavLink>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      ];
    }
  }

  render() {
    return (
      <div>
        <Navbar
          color="faded"
          className="navbar navbar-toggleable-md navbar-inverse bg-inverse"
          expand="md"
        >
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar style={{ margin: "auto" }}>
              <NavItem>
                <NavLink
                  tag={Link}
                  to="/"
                  activeClassName="active"
                  exact
                  onClick={this.toggleNavbarOnClick}
                >
                  Home
                </NavLink>
              </NavItem>
              {this.userIsNotAuthenticated()}
              {this.userIsAuthenticatedEmail()}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;
