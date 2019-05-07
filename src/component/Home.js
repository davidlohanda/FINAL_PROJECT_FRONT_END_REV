import React from 'react'
import {Link} from 'react-router-dom'
import '../support/css/Homestyle.css'
import HomeLogo from '../img/Logo.png'



class Home extends React.Component{
    render(){
        return(
            <div className="home-main-container text-center">
                <img src={HomeLogo} alt="logo" />
                <div className="log-reg">
                    <Link to="/login" style={{textDecoration:'none'}}><p>Login</p></Link>
                    <Link to="/register" style={{textDecoration:'none'}}><p>Register</p></Link>
                </div>
            </div>
        )
    }
}

export default Home