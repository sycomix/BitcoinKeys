import React, {Component} from 'react';
import { Grid, Row } from 'react-bootstrap';
import { connect } from 'react-redux'


class HeaderComponen extends Component{
    constructor(props){
        super(props)
        this.state = {
            position: false,
            styling: ' '
        }
    }


    componentDidMount(){
        window.addEventListener("scroll",(event)=> {
            var top = window.scrollY;
          if(top >= 200){
              this.setState({position: true, styling: 'headerFixed'}) 
          }else if(top <= 199){
            this.setState({styling: "headerDisapear" })
              if(this.state.position === true){
              setTimeout(()=>{
                this.setState({position: false})
              },480)
            }
          }
        }, false);
      }

      stylingForAchievement(){
          if(this.props.userAuth !== null){
          return "text-center paddingForAchievement"
          }else{
          return "text-center";
          }
      }

    render(){
        return(
            <div className='header'>
            {this.state.position && <div className={this.state.styling}>
            <p className="clickLabel">
           {this.props.click}
           <span className='clickTextLabel'>click</span>
           <span className='transactionLabel'>{this.props.transaction}</span>
           <span className='transactionLabelText'>transaction</span></p>
            </div>}
            <Grid>
           <Row className="show-grid">
           <div className="text-center">
           <p className="click oneLine">
           {this.props.click}
           <span className='clickText'>click</span></p>
           <p className="click oneLine">
           <span className='transaction'>{this.props.transaction}</span>
           <span className='clickText'>transaction</span></p>
           </div>
           <p className={this.stylingForAchievement()}>text for achievement</p>
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