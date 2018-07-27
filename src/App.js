import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {connect} from 'react-redux';
import './App.css';
import {firebase} from './firebase';

import TableWalletComponent from './components/TableWallet/TableWallet';
import FooterComponent from './components/Footer/Footer';
import NavbarComponent from './components/Navbar/Navbar';
import HeaderComponent from './components/Header/Header';
import ErrorServerComponent from './components/ErrorServer/ErrorServer';
import RegModal from './components/RegModal/RegModal';



class App extends Component {

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.props.changeUserStatus(authUser)
        : this.props.changeUserStatus(null)
    });
  }

  render() {
    return (
    <div>          
      <NavbarComponent/>
      <HeaderComponent/>
      <RegModal/>
      <Router>
     <div>   
      {this.props.statusError === 'false' && <Route exact path="/" component={TableWalletComponent}/>}
      {this.props.statusError === 'false' && <Route path="/:id" component={TableWalletComponent}/>}
      {this.props.statusError !== "false" && <Route path="/*" component={ErrorServerComponent}/>}
     </div> 
      </Router>
      <FooterComponent/> 
    </div>  
    );
  }
}

const mapStateToProps = state => {
  return {
    statusError: state.basic.statusError,
    userAuth: state.basic.userAuth,
  }
}

const mapDispatchToProps  = dispatch => {
  return {
   changeUserStatus: (event) => dispatch({
      type: "USER_AUTH",
      userAuth: event
    }),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
