import React, { Component } from 'react';
import {Pager} from 'react-bootstrap'
import {connect} from 'react-redux'

import axios from 'axios';


class TableWalletComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataOfWallet: [],
      id: 1
    };
  }

componentWillMount(){
    if(this.props.match.params.id === undefined){
    this.setState({id: 1})
    }else{
     this.setState({id: this.props.match.params.id})
   }
  }


  render() {
    axios.get("https://bitcoin-keys.appspot.com/" + this.state.id)
   .then(data => { 
     this.setState({dataOfWallet: data.data})
    })
    .catch((error)=>{
          this.props.changeServerStatus(error)
    })

   const listData = this.state.dataOfWallet.map((data)=>
            <tr key={data.Number}>
              <th className="text-center">{data.Private}</th>
              <th className="text-center"><a href={"https://www.blockchain.com/ru/btc/address/" + data.Compressed} target="_blank">{data.Compressed}</a></th>
              <th className="text-center"><a href={"https://www.blockchain.com/ru/btc/address/" + data.Uncompressed} target="_blank">{data.Uncompressed}</a></th>
            </tr>  
   )
    return (
    <div className="backgroundColorBody">  
      <div className="tableStyle">
      <div className="">
        <p>Page {this.state.id} of 1809251394333065553493296640760748560200586941860545380978205674086221273350</p>
      </div>  
     <div className="text-right prevNextStyle">
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
        <table className="table-striped row-border" width="100%">
          <thead>
          <tr>
            <th className="text-center">Private Key</th>
            <th className="text-center">Compressed</th>
            <th className="text-center">Uncompressed</th>
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
      statusCode: state.basic.statusError
  }
}

const mapDispatchToProps  = dispatch => {
  return {
   changeServerStatus: (event) => dispatch({
      type: "CHANGE_SERVER_ERROR",
      statusMessage: event
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableWalletComponent);