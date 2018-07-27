import React, { Component } from 'react';
import { Pager, Label, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import update from 'immutability-helper';
import { db } from '../../firebase';
import _ from 'lodash';

import axios from 'axios';



class TableWalletComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataOfWallet: [],
      id: 1,
      countForRegist: 5,
      walletData: []
    };

    axios.get("https://bitcoin-keys.appspot.com/" + this.state.id)
      .then(data => {
        data.data.forEach(element => {
          element.UncompressedUSD = "?";
          element.CompressedUSD = "?";
        });
          this.setState({ dataOfWallet: data.data });
          this.getWalletDataFromDB()
      })
      .catch((error) => {
        this.props.changeServerStatus(error)
      })
  }

  componentDidUpdate(prevProps){
    if (this.props.userAuth !== prevProps.userAuth) {
      this.getWalletDataFromDB();
    }
  }

  getWalletDataFromDB(){
    if(this.props.userAuth !== null){
      let uid = this.props.userAuth.uid
      let page = this.state.id
      let dataFromDB = db.getWalletData(uid, page)
      dataFromDB.on('value', snapshot => {
        this.setState({walletData: snapshot.val()})
      });

    }
  }


  componentWillMount() {
    if (this.props.match.params.id === undefined) {
      this.setState({ id: 1 })
    } else {
      this.setState({ id: this.props.match.params.id });
    };
  }

  getDataApi = (param, index, nameOfValue) => {
    axios.get("https://cors-anywhere.herokuapp.com/https://blockchain.info/rawaddr/" + param)
      .then(data => {
        this.setState({
          dataOfWallet: update(this.state.dataOfWallet, { [index]: { [nameOfValue]: { $set: data.data.final_balance } } })
        })
        this.clickCalculation();
        this.setDataToDB(param);
        this.transactionCalcularion(data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  transactionCalcularion(data){
    if(data.n_tx > 0){
      let transaction = this.props.transaction + 1;
      this.props.transactionPlus(transaction);
    }
  }

  clickCalculation() {
    if (this.props.userAuth !== null) {
      let click = this.props.click + 1;
      this.props.clickPlus(click);
    } else {
      let click = this.props.click + 1;
      this.props.clickPlus(click);
      if (this.props.click === this.state.countForRegist) {
        this.props.openRegistModal();
        let add = this.state.countForRegist + 5;
        this.setState({ countForRegist: add });
      }
    }
  }

  setDataToDB(param){
    if(this.props.userAuth !== null){
      let d = _.findKey(this.state.walletData, function(o) { return o.walletId === param; });
      if(d === undefined){
        let uid = this.props.userAuth.uid
        let page = this.state.id
        db.setWalletData(uid, page, param)
      }
    }
  }

  styleForPrise(data) {
    if (data === '?') {
      return 'waiting';
    } else if (data > 0) {
      return 'sussessFind';
    } else if (data <= 0) {
      return 'faildFind';
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


  render() {
//    var BigNumber = require('big-number');

//var x = new BigNumber(this.state.id, 10);

    const listData = this.state.dataOfWallet.map((data, i) =>
      <tr key={i}>
        <th className="text-center tableText sizeRow">{data.Private}</th>
        <th className="text-center sizeRow"
          onClick={() => this.getDataApi(data.Compressed, i, "CompressedUSD")}>
          <Label bsClass={this.styleForWallet(data.Compressed)}>{data.Compressed}</Label>
        </th>
        <th className="text-center tableText sizeRow">
          <Label bsClass={this.styleForPrise(data.CompressedUSD)}>{data.CompressedUSD}</Label>
        </th>
        <th className="text-center sizeRow"
          onClick={() => this.getDataApi(data.Uncompressed, i, "UncompressedUSD")}>
          <Label bsClass={this.styleForWallet(data.Uncompressed)}>{data.Uncompressed}</Label>
        </th>
        <th className="text-center tableText sizeRow">
          <Label bsClass={this.styleForPrise(data.UncompressedUSD)}>{data.UncompressedUSD}</Label>
        </th>
      </tr>
    )
    return (
      <div className="backgroundColorBody">
        <div className="tableStyle">
          <div className="">
            <p>Page {this.state.id} of 2315841784746323908471419700173758157056751285581498087652103262830363229887</p>
          </div>
          <div className="prevNextStyle">
            <Pager>
              <Pager.Item
                previous
                href={"/" + (Number(this.state.id) - 1)}
                disabled={this.state.id === 1}
               >
                &larr; Previous
       </Pager.Item>
              <Button bsStyle="info" href={"/" + Math.floor(Math.random() * 100000000000000000000) + 1}>Random</Button>
              <Pager.Item
                next
                href={"/" + (Number(this.state.id) + 1)}>
                Next &rarr;
        </Pager.Item>
            </Pager>
          </div>
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
          <div className="prevNextStyleDown">
            <Pager>
              <Pager.Item
                previous
                href={"/" + (Number(this.state.id) - 1)}
                disabled={this.state.id === 1}
              >
                &larr; Previous
       </Pager.Item>
              <Pager.Item
                next
                href={"/" + (Number(this.state.id) + 1)}
           >
                Next &rarr;
        </Pager.Item>
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