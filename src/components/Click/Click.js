import React, { Component } from 'react';
import {connect} from 'react-redux'

class ClickComponent extends Component{
    render(){
        return(
            <div className="header">
                <p className="click text-center">{this.props.click}<span className='clickText'>click</span></p>
            </div>    
        )
    }

}

const mapStateToProps = state => {
    return {
        click: state.basic.click
    }
  }

export default connect(mapStateToProps) (ClickComponent);