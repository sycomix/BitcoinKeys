import React, {Component} from 'react';
import {Grid, Row} from 'react-bootstrap';

class HeaderComponen extends Component{
    render(){
        return(
            <div className='header'>
            <Grid>
           <Row className="show-grid">
                <p className="text-center headerLogoText">Bitcoin Keys</p>
                <p className="headerText text-center"> Some powerful text for describe all features about this webpage. 
                    Some powerful text for describe all features about this webpage. 
                    Some powerful text for describe all features about this webpage. 
                    Some powerful text for describe all features about this webpage.</p> 
           </Row>     
             </Grid>
           </div>
        )
    }
} 

export default HeaderComponen;