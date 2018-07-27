import React, { Component } from 'react';
import { Navbar, Button, Nav, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux'
import { auth } from '../../firebase'
import logo from '../../assets/logo.png';
import '../../App.css'

class NavbarComponen extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
           <img alt="logo" src={logo} className="logoImg"/><a className="logo" href="/">Bitcoin Keys</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {this.props.userAuth === null && 
          <Nav pullRight>
          <NavItem >
            <Button bsStyle="info" onClick={this.props.openRegistModal}>Login / SignUp</Button>
            </NavItem >
          </Nav>}
          {this.props.userAuth !== null && 
          <Nav pullRight>
            <NavItem className="email">
              {this.props.userAuth.email}
            </NavItem>
            <NavItem >
            <Button bsStyle="info" onClick={auth.doSignOut}>Sign Out</Button>
            </NavItem >
          </Nav>}
          </Navbar.Collapse>
      </Navbar>
    )
  }
}

const mapStateToProps = state => {
  return {
    statusRegistModal: state.basic.registModal,
    userAuth: state.basic.userAuth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openRegistModal: () => dispatch({
      type: "OPEN_MODAL_REGIST",
      registModal: true
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarComponen);