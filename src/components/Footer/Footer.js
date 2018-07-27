import React, {Component} from 'react';

class FooterComponen extends Component{
    render(){
        return(
            <div className='footer'>
               <p className="text-center footerTextUp">© 2017-2018 <a href="/">Bitcoin Keys</a>. The Blockchain Era Free Lottery</p>
                <p className="text-center footerTextDown">Bitcoin private keys database with balances - happy searching!</p> 
             </div>   
        )
    }
} 

export default FooterComponen;