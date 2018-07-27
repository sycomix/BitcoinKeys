import React, {Component} from 'react';
import { Grid, Row } from 'react-bootstrap';
import { connect } from 'react-redux'

class HeaderComponen extends Component{
    render(){
        return(
            <div className='header'>
            <Grid>
           <Row className="show-grid">
           <p className="click text-center">
           {this.props.click}
           <span className='clickText'>click</span>
           <span className='transaction'>{this.props.transaction}</span>
           <span className='clickText'>transaction</span></p>
           <p className="text-center">text for achievement</p>
           {this.props.userAuth === null &&<p className="text-center registText">(For saving your result, regist please!)</p>}
           </Row>     
             </Grid>
           </div>
        )
    }
} 

const mapStateToProps = state => {
    return {
        click: state.basic.click,
        transaction: state.basic.transaction,
        userAuth: state.basic.userAuth,
    }
  }

export default connect(mapStateToProps) (HeaderComponen);