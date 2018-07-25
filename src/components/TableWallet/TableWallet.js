import React, { Component } from 'react';
import { Pager, Label, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import update from 'immutability-helper';

import axios from 'axios';


class TableWalletComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataOfWallet: [],
      id: 1,
      countForRegist: 5
    };

    axios.get("https://bitcoin-keys.appspot.com/" + this.state.id)
      .then(data => {
        let keysData = []
        data.data.forEach(element => {
          keysData.Private = element.Private;
          keysData.Compressed = element.Compressed;
          keysData.Uncompressed = element.Uncompressed;
          keysData.UncompressedUSD = "-";
          keysData.CompressedUSD = "-"
          keysData.push(keysData)
        });
        this.setState({ dataOfWallet: keysData })
      })
      .catch((error) => {
        this.props.changeServerStatus(error)
      })
  }


  componentWillMount() {
    if (this.props.match.params.id === undefined) {
      this.setState({ id: 1 })
    } else {
      this.setState({ id: this.props.match.params.id })
    }
  }

  getDataApi = (param, index, nameOfValue) => {
    axios.get("https://cors-anywhere.herokuapp.com/https://blockchain.info/rawaddr/" + param)
      .then(data => {
        this.setState({
          dataOfWallet: update(this.state.dataOfWallet, { [index]: { [nameOfValue]: { $set: data.data.final_balance } } })
        })
        this.clickCalculation();
      })
      .catch((error) => {
        console.log(error)
      })
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

  styleForPrise(data) {
    if (data === '-') {
      return 'waiting';
    } else if (data > 0) {
      return 'sussessFind';
    } else if (data <= 0) {
      return 'faildFind';
    }
  }


  render() {
    const listData = this.state.dataOfWallet.map((data, i) =>
      <tr key={i}>
        <th className="text-center tableText sizeRow">{data.Private}</th>
        <th className="text-center sizeRow"
          onClick={() => this.getDataApi(data.Compressed, i, "CompressedUSD")}>
          <Label bsClass='colorHover'>{data.Compressed}</Label>
        </th>
        <th className="text-center tableText sizeRow">
          <Label bsClass={this.styleForPrise(data.CompressedUSD)}>{data.CompressedUSD}</Label>
        </th>
        <th className="text-center sizeRow"
          onClick={() => this.getDataApi(data.Uncompressed, i, "UncompressedUSD")}>
          <Label bsClass='colorHover'>{data.Uncompressed}</Label>
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
            <p>Page {this.state.id} of 1809251394333065553493296640760748560200586941860545380978205674086221273350</p>
          </div>
          <div className="prevNextStyle">
            <Pager>
              <Pager.Item
                previous
                href={"/" + Number(Number(this.state.id) - 1)}
                disabled={Number(this.state.id) === 1}>
                &larr; Previous
       </Pager.Item>
              <Button bsStyle="info" href={"/" + Math.floor(Math.random() * 100000000000000000000) + 1}>Random</Button>
              <Pager.Item
                next
                href={"/" + Number(Number(this.state.id) + 1)}>
                Next &rarr;
        </Pager.Item>
            </Pager>
          </div>
          <table className="table-striped row-border" width="100%">
            <thead>
              <tr>
                <th className="text-center">Private Key</th>
                <th className="text-center">Compressed</th>
                <th className="text-center">USD</th>
                <th className="text-center">Uncompressed</th>
                <th className="text-center">USD</th>
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
                href={"/" + Number(Number(this.state.id) - 1)}
                disabled={Number(this.state.id) === 1}>
                &larr; Previous
       </Pager.Item>
              <Pager.Item
                next
                href={"/" + Number(Number(this.state.id) + 1)}>
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
    click: state.basic.click
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableWalletComponent);