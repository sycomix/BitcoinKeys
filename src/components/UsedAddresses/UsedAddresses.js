import React, {Component} from 'react';
import { connect } from 'react-redux';
import { db } from '../../firebase';
import { Button} from 'react-bootstrap';
import { NavLink } from 'react-router-dom'

class UsedAddressesComponent extends Component{
    constructor(props){
    super(props)
    this.state = {
        pages : []
    }
    }

    componentDidMount(){
        if(this.props.userAuth !== null){
            this.getPagesDataFromDB()
        }
    }

    componentDidUpdate(prevProps){
        if (this.props.userAuth !== prevProps.userAuth) {
            this.setState({pages: []})
            this.getPagesDataFromDB();
        }
    }

    getPagesDataFromDB(){
        if(this.props.userAuth !== null){
          let id = this.props.userAuth.uid;
            let pages = db.getPagesData(id);
            pages.on('value', snapshot => {
                if(snapshot.val() !== null){
                this.setState({pages: snapshot.val()})
                }
              });
        }
    }
    render(){
        var dataMap
        if(this.state.pages !== null ){
            dataMap = Object.keys(this.state.pages).map((item, index)=>
            <NavLink key={index} className="linkTable" to={"/wallet/" + this.state.pages[item].page}>
            <Button className="styleForButtonAdress" bsStyle="info">
                {this.state.pages[item].page}
                </Button></NavLink>
             )
            }
        return(
        <div style={{paddingTop:20, paddingBottom:10}} className='backgroundColorBody mobileDisplay text-center'>
            {this.state.pages.length === 0 && <p className="text-center textAdress">Here you can see your visited pages if you used action on this pages.</p>}
            {this.props.userAuth === null && <p className="text-center registText">Register please to open this feature!</p>}
            {dataMap}
        </div>

        )
    }
} 


const mapStateToProps = state => {
    return {
      userAuth: state.basic.userAuth,
    }
  }



export default connect(mapStateToProps)(UsedAddressesComponent);