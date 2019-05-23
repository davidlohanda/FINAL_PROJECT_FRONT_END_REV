import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Header1 from './Header1';
import Shop from './Shop'
import Footer from './Footer'

class AllCategories extends React.Component{
    
    render(){
        if(this.props.username === ''){
            return <Redirect to="/login"/> //proteksi agar saat user belum login dan mengetik path localhost:3000/allcategories maka akan redirect ke komponen login 
        }
        return(
            <div>
                <Header1/>
                <hr style={{marginBottom:'120px',border:'none'}}></hr>
                <Shop/>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username : state.user.username
    }
}

export default connect(mapStateToProps)(AllCategories)