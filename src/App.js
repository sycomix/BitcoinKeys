import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { NavLink } from 'react-router-dom'
import {connect} from 'react-redux';
import './App.css';
import {db, firebase} from './firebase';

import TableWalletComponent from './components/TableWallet/TableWallet';
import FooterComponent from './components/Footer/Footer';
import NavbarComponent from './components/Navbar/Navbar';
import HeaderComponent from './components/Header/Header';
import ErrorServerComponent from './components/ErrorServer/ErrorServer';
import RegModal from './components/RegModal/RegModal';
import FAQComponent from './components/FAQ/FAQ';
import UsedAddressesComponent from './components/UsedAddresses/UsedAddresses';



class App extends Component {

  constructor(props) {
    super(props)
    firebase.auth.onAuthStateChanged(authUser => {
      if(authUser !== null) {
        this.props.changeUserStatus(authUser);
        this.getClickData(authUser.uid);
      }else{
        this.props.changeUserStatus(null)
      }
    });
  }


  getClickData(uid){
    let dataFromDB = db.getUsersClick(uid);
    dataFromDB.on('value', snapshot => {
      let data = snapshot.val()
      if(data === null){
        this.props.clickPlus(0);
        this.props.transactionPlus(0);
      }else{
      this.props.clickPlus(data.click);
      this.props.transactionPlus(data.transaction);
      }
    });
  }


  render() {
    return (
    <div>  
      <div className="app">        
      <NavbarComponent/>
      <HeaderComponent/>
      <RegModal/> 
      <Router>
     <div> 
     <div className="text-center linkSpace">    
     <NavLink className="basicPage" to='/wallet/1'>BITCOIN KEYS</NavLink>
     <NavLink className="UsedAdress" to='/usedAddresses'>USED ADDRESSES</NavLink>
     <NavLink className="FAQ" to='/faq'>FAQ</NavLink>
     </div>
      {this.props.statusError === 'false' && <Route exact path="/" component={TableWalletComponent}/>}
      {this.props.statusError === 'false' && <Route exact path="/wallet/:id" component={TableWalletComponent}/>}
      {this.props.statusError !== "false" && <Route path="/**" component={ErrorServerComponent}/>}
      <Route exact path="/faq" component={FAQComponent}/>
      <Route exact path="/usedAddresses" component={UsedAddressesComponent}/>
     </div> 
      </Router>
      </div>
      <FooterComponent/> 
    </div>  
    );
  }
}

const mapStateToProps = state => {
  return {
    statusError: state.basic.statusError,
    userAuth: state.basic.userAuth,
    click: state.basic.click,
    transaction: state.basic.transaction
  }
}

const mapDispatchToProps  = dispatch => {
  return {
   changeUserStatus: (event) => dispatch({
      type: "USER_AUTH",
      userAuth: event
    }),
    clickPlus: (data) => dispatch({
      type: "CLICK_PLUS",
      click: data
    }),
    transactionPlus: (data) => dispatch({
      type: "TRANSACTION_PLUS",
      transaction: data
    }),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
