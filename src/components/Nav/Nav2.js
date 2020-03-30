import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
  MDBBtn
} from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";

export default class Nav2 extends Component {
  state = {
    isOpen: false
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <Router>
        <MDBNavbar color="default-color" dark expand="md" fixed="top">
          <MDBNavbarBrand>
            <strong className="white-text">JIT-IDPS</strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler
            onClick={this.toggleCollapse}
            image="https://mdbootstrap.com/img/svg/hamburger3.svg?color=00FBD8"
          />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBBtn color="success" onClick={this.props.startSniffer}>
                  START
                </MDBBtn>
              </MDBNavItem>
              <MDBNavItem>
                <MDBBtn color="danger" onClick={this.props.stopSniffer}>
                  STOP
                </MDBBtn>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      </Router>
    );
  }
}
