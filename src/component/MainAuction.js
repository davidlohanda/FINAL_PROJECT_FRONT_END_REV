import React from 'react'
import {connect} from 'react-redux'


import Header1 from './Header1';
import Bigetron from './Bigetron';
import HeaderCategory from './HeaderCategory';
import Separator from './Separator';
import HeaderChoose from './HeaderChoose';
import Shop from './Shop';
import How from './How';
import Footer from './Footer';
import Home from './Home'



class MainAuction extends React.Component{
    render(){
        if(this.props.username === ''){
            return <Home/>
        }
        return(
            <div>
                <Header1 username ={this.props.username}/>
                <Bigetron/>
                <Separator/>
                <HeaderCategory/>
                <hr className="hr-1" width="100%"></hr>
                <HeaderChoose/>
                <hr className="hr-2" width="100%"></hr>
                <Shop/>
                <hr className="hr-2" width="100%"></hr>
                <How/>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        username:state.user.username,
        cart : state.cart.count
    }
}

export default connect(mapStateToProps)(MainAuction)