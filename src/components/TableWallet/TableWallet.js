import React, { Component } from 'react';
import { Pager, Label} from 'react-bootstrap'
import { connect } from 'react-redux'
import update from 'immutability-helper';
import { db } from '../../firebase';
import _ from 'lodash';
import { NavLink } from 'react-router-dom'

import axios from 'axios';



class TableWalletComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataOfWallet: [],
      id: 1,
      countForRegist: 5,
      walletData: [],
      hover: []
    };
  }

  componentWillMount() {
    this.getDataID();
  }

  componentWillUpdate(prevProps){
    if(prevProps.match.params.id !== this.props.match.params.id){
      this.getDataID();
    }
  }

  componentDidUpdate(prevProps){
    if (this.props.userAuth !== prevProps.userAuth) {
      if(this.props.userAuth === null){
        this.props.clickPlus(0);
        this.props.transactionPlus(0);
        this.setState({walletData: []});
        this.getDataID();
      }else{
      this.getWalletDataFromDB();
      }
    };
  }


  getDataFromServer(){
    let id
    if(this.props.match.params.id === undefined){
      id = 1
    }else{
      id =this.props.match.params.id
    }
    axios.get("https://bitcoin-keys.appspot.com/" + id)
    .then(data => {
      data.data.forEach(element => {
        element.UncompressedUSD = "?";
        element.CompressedUSD = "?";
        element.UncompressedTransaction = '?';
        element.ClickedUncom = false;
        element.CompressedTransaction = "?";
        element.ClickedCom = false;
      });
        this.setState({ dataOfWallet: data.data });
        this.getWalletDataFromDB()
    })
    .catch((error) => {
      this.props.changeServerStatus(error)
    })
  }

  getDataID(){
    let promise = new Promise((resolve, rejects)=>{
      if (this.props.match.params.id === undefined) {
        this.setState({ id: 1 })
        resolve(this.props.match.params.id )
      }else{
        this.setState({ id: this.props.match.params.id });
        resolve(this.props.match.params.id )
      };
    })
    promise.then(()=>{
      this.getDataFromServer();
    })

  }


  getWalletDataFromDB(){
    if(this.props.userAuth !== null){
      let uid = this.props.userAuth.uid
      let page 
      if (this.props.match.params.id === undefined) {
      page = 1;
    }else{
      page = this.props.match.params.id;
    }
      let dataFromDB = db.getWalletData(uid, page)
      dataFromDB.on('value', snapshot => {
        this.setState({walletData: snapshot.val()});
        if(snapshot.val() !== null){
        this.setValueToTable(snapshot.val())
        }
      });

    }
  }

  setValueToTable(data){
   let dataWallet = this.state.dataOfWallet;
   for (var i = 0, len = dataWallet.length; i < len; i++) {
         Object.keys(data).map((item) => {
          if(dataWallet[i].Compressed === data[item].walletId){
          this.setState({
              dataOfWallet: update(this.state.dataOfWallet, { [i]: { CompressedUSD: { $set: data[item].value } } })
            })
          };
          if(dataWallet[i].Uncompressed === data[item].walletId){
          this.setState({
              dataOfWallet: update(this.state.dataOfWallet, { [i]: { UncompressedUSD: { $set: data[item].value } } })
            })
          }
          return data[item]
        })
       }
  }


  getDataApi = (param, index, btc, transaction, clickUnregist) => {
    axios.get("https://api-r.bitcoinchain.com/v1/address/" + param)
      .then(data => {
        var balance;
        if(data.data[0].balance === undefined){
          balance = "0";
          this.setState({
            dataOfWallet: update(this.state.dataOfWallet, { [index]: { [btc]: { $set: 0 } } })
          })
          this.setState({
            dataOfWallet: update(this.state.dataOfWallet, { [index]: { [transaction]: { $set: 0 } } })
          })
        }else if(data.data[0].transaction > 0 || data.data[0].balance === 0){
          balance = "+";          
          this.setState({
            dataOfWallet: update(this.state.dataOfWallet, { [index]: { [btc]: { $set: "+" } } })
          })
          this.setState({
            dataOfWallet: update(this.state.dataOfWallet, { [index]: { [transaction]: { $set: data.data[0].transaction } } })
          })
        }else if(data.data[0].balance > 0){
          balance = "$"
          this.setState({
            dataOfWallet: update(this.state.dataOfWallet, { [index]: { [btc]: { $set: "$" } } })
          })
        }
        this.clickAndTransactionCalculation(data.data, param, index, clickUnregist);
        this.setDataToDB(param, balance );
      })
      .catch((error) => {
        console.log(error)
      })
  }


  clickAndTransactionCalculation(data, param, index, clickUnregist) {
    if (this.props.userAuth !== null) {
      this.setPageToDB()
      let d = _.findKey(this.state.walletData, function(o) { return o.walletId === param; });
      if(d === undefined){
        let transaction = this.props.transaction;
        let uid = this.props.userAuth.uid
        if(data[0].transactions > 0){
           transaction = this.props.transaction + 1;
        }
        let click = this.props.click + 1;
       db.setUsersClick(uid, click, transaction); 
      }
    } else {
      if(this.state.dataOfWallet[index][clickUnregist] === false){
        this.setState({
          dataOfWallet: update(this.state.dataOfWallet, { [index]: { [clickUnregist]: { $set: true } } })
        })
      let click = this.props.click + 1;
      this.props.clickPlus(click);
      if(data[0].transactions > 0){
        let transaction = this.props.transaction + 1;
        this.props.transactionPlus(transaction);
     }
      if (this.props.click === this.state.countForRegist) {
        this.props.openRegistModal();
        let add = this.state.countForRegist + 5;
        this.setState({ countForRegist: add });
      }
    }
  }
  }

  setPageToDB(){
    if(this.state.walletData === null){
      let uid = this.props.userAuth.uid;
      let page 
      if (this.props.match.params.id === undefined) {
      page = 1;
    }else{
      page = this.props.match.params.id;
    }
      db.setPages(uid, page)
    }
  }

  setDataToDB(param, balance){
    if(this.props.userAuth !== null){
      let d = _.findKey(this.state.walletData, function(o) { return o.walletId === param; });
      if(d === undefined){
        let uid = this.props.userAuth.uid
        let page 
        if (this.props.match.params.id === undefined) {
        page = 1;
      }else{
        page = this.props.match.params.id;
      }
        db.setWalletData(uid, page, param, balance)
      }
    }
  }

  styleForPrise(data) {
    if (data === '?') {
      return 'waiting';
    } else if (data === "$") {
      return 'sussessFind';
    } else if (data === 0 || data === "0") {
      return 'faildFind';
    }else if (data === "+") {
      return 'transactionFind'
    }
  }

  styleForWallet(data){
    let d = _.findKey(this.state.walletData, function(o) { return o.walletId === data; });
    if(d === undefined){
      return 'colorHover'
    }else{
      return 'walletFind'
    }
  }

  handleMouseIn(index) {
    this.setState({
      hover: update(this.state.hover, { [index]: { $set: true } })
    })
  }
  
  handleMouseOut(index) {
    this.setState({
      hover: update(this.state.hover, { [index]: { $set: undefined } })
    })
  }

  stylingForTooltip(i){
     if(this.state.hover[i] === undefined){
       return "displayNone"
     }else{
       return "dispaly"
     }
  }

  goToPrevious(){
    var bigInt = require("big-integer");
    let page 
    if (this.props.match.params.id === undefined) {
    page = 1;
  }else{
    page = this.props.match.params.id;
  }
    let goToPrevious = bigInt(page).minus(1);
    if(this.props.match.params.id === "1"){
      return "1"
    }else{
      return goToPrevious.toString();
    }
  }

  goToNext(){
    var bigInt = require("big-integer");
    let page 
    if (this.props.match.params.id === undefined) {
    page = 1;
  }else{
    page = this.props.match.params.id;
  }
    let goToNext = bigInt(page).plus(1);
    if(this.props.match.params.id === '2315841784746323908471419700173758157056751285581498087652103262830363229887'){
      return "2315841784746323908471419700173758157056751285581498087652103262830363229887"
    }else{
      return goToNext.toString();
    }
  }



  render() {
    var bigInt = require("big-integer");
    let id 
    if (this.props.match.params.id === undefined) {
    id = 1;
  }else{
    id = this.props.match.params.id;
  }
    var page = bigInt(id);

    let numRandom = bigInt.randBetween("1", "2315841784746323908471419700173758157056751285581498087652103262830363229887")

    const listData = this.state.dataOfWallet.map((data, i) =>
      <tr key={i}>
        <th className="privateRow tableText sizeRow paddingRightRow">
        <p className="cursorPoiner paddingNone" onMouseOver={() => this.handleMouseIn(i)} onMouseOut={() => this.handleMouseOut(i)}>
        {data.Private}
        </p>
        <div className={this.stylingForTooltip(i)}>{data.Number}</div>
        </th>
        <th className="sizeRow paddingRightRow"
          onClick={() => this.getDataApi(data.Compressed, i, "CompressedUSD", "CompressedTransaction", "ClickedCom")}>
          <Label bsClass={this.styleForWallet(data.Compressed)}>{data.Compressed}</Label>
        </th>
        <th className="tableText sizeRow">
          <a className='linkTable' href={"https://www.blockchain.com/btc/address/"+data.Compressed} target="_blank"><Label bsClass={this.styleForPrise(data.CompressedUSD)}>{data.CompressedUSD}</Label></a>
        </th>
        <th className="sizeRow paddingLeftRow paddingRightRow"
          onClick={() => this.getDataApi(data.Uncompressed, i, "UncompressedUSD", "UncompressedTransaction", "ClickedUncom")}>
          <Label bsClass={this.styleForWallet(data.Uncompressed)}>{data.Uncompressed}</Label>
        </th>
        <th className="tableText sizeRow">
          <a className='linkTable' href={"https://www.blockchain.com/btc/address/"+data.Uncompressed} target="_blank"><Label bsClass={this.styleForPrise(data.UncompressedUSD)}>{data.UncompressedUSD}</Label></a>
        </th>
      </tr>
    )
    return (
      <div className="backgroundColorBody">
        <div className="tableStyle">
          <div className="mobileDisplay">
            <p className="pages">Page {page.toString()} of Page 2315841784746323908471419700173758157056751285581498087652103262830363229887</p>
          </div>
          <div className="prevNextStyle">
            <Pager>
              <NavLink
              className="Previous"
                to={"/wallet/" + this.goToPrevious()}
                disabled={page.toString() === '1'}
               >
                &larr; Previous
             </NavLink>
              <NavLink className="Random" to={"/wallet/" + numRandom.toString()}>Random</NavLink>
              <NavLink
              className="Next"
                to={"/wallet/" + this.goToNext()}>
                Next &rarr;
        </NavLink>
            </Pager>
          </div>
          <div className='mobileDisplay'>
          <table className="table-striped row-border" width="100%">
            <thead>
              <tr>
                <th className="text-center">Private Key</th>
                <th className="text-center">Compressed Key</th>
                <th className="text-center">BTC</th>
                <th className="text-center">Uncompressed Key</th>
                <th className="text-center">BTC</th>
              </tr>
            </thead>
            <tbody>
              {listData}
            </tbody>
          </table>
          </div>
          <div className="prevNextStyleDown">
            <Pager>
              <NavLink
              className="Previous"
                to={"/wallet/" + this.goToPrevious()}
                disabled={page.toString() === '1'}
               >
                &larr; Previous
             </NavLink>
             <NavLink className="Random" to={"/wallet/" + numRandom.toString()}>Random</NavLink>
              <NavLink
              className="Next"
                to={"/wallet/" + this.goToNext()}>
                Next &rarr;
             </NavLink>
            </Pager>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    statusCode: state.basic.statusError,
    userAuth: state.basic.userAuth,
    click: state.basic.click,
    transaction: state.basic.transaction
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeServerStatus: (event) => dispatch({
      type: "CHANGE_SERVER_ERROR",
      statusMessage: event
    }),
    openRegistModal: () => dispatch({
      type: "OPEN_MODAL_REGIST",
      registModal: true
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

export default connect(mapStateToProps, mapDispatchToProps)(TableWalletComponent);