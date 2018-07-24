import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Grid, Row} from 'react-bootstrap';

class ErrorServerComponent extends Component{
    render(){
        return(
            <div className="error">
            <Grid>
           <Row className="show-grid">
           <h3 className="text-center" >Something went wrong!</h3>
            <p className="text-center">Status code message: <b>{this.props.statusError.message}. </b></p>
            <p className="text-center">Please check the browser input field. It only can contain digits</p>
            <p className="text-center">or contact with us!</p>
            </Row>    
             </Grid>  
            </div> 
        )
    }
} 

const mapStateToProps = state => {
    return {
      statusError: state.basic.statusError
    }
  }

export default connect(mapStateToProps)(ErrorServerComponent);