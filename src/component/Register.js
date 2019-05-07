import React from 'react'
import {Link,Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {connect} from 'react-redux'
import {onRegister} from '../1.actions'
import Cookie from 'universal-cookie'

import '../support/css/Registerstyle.css'

const cookie = new Cookie()

class Register extends React.Component{
    state={error:'', success:''}

    componentWillReceiveProps(newProps){
        cookie.set('userData',newProps.username,{path:'/'})
    }

    btnRegisterClick=()=>{
        var username=this.refs.username.value
        var email=this.refs.email.value
        var password=this.refs.password.value
        var confirmPassword=this.refs.confirmPassword.value
        if(username===''||email===''||password===''||confirmPassword===''){
            this.setState({error:'Please fill all the requirement'})
        }else if(password !== confirmPassword){
            this.setState({error:`Password didn't macth`})
        }else{
            this.props.onRegister(username,email,password)
            this.setState({success:'Thankyou for register, check your email to verify your accout'})
        }

        this.refs.username.value=''
        this.refs.email.value=''
        this.refs.password.value=''
        this.refs.confirmPassword.value=''

    }

    renderBtnOrLoading=()=>{
        if(this.props.loading===true){
            return <div style={{margin: '0 auto'}}><Loader
            type="Circles"
            color="#5f0a87"
            height="50"	
            width="50"
            /></div>
        }
        return <button onClick={this.btnRegisterClick}><i className="fab fa-telegram-plane" /></button>
    }

    renderErrorMessage=()=>{
        if(this.props.error !== ''){
            return <div className="alert alert-danger mt-3" role="alert" style={{fontSize:'22px', textAlign:'center'}}>
                        {this.props.error}
                    </div>
        }else if(this.state.error!==''){
            return <div className="alert alert-danger mt-3" role="alert" style={{fontSize:'22px', textAlign:'center'}}>
                        {this.state.error}
                    </div>
        }else if(this.state.success!==''){
            return <div className="alert alert-success mt-3" role="alert" style={{fontSize:'22px', textAlign:'center'}}>
                        {this.state.success}
                    </div>
        }
    }

    render(){
        if(this.props.username){
            return <Redirect to="/"/>
        }
        return(
            <div className="main animated fadeIn">
                <div id="bungkus">
                    <div className="tempat-form">
                        <span className="form-title">Sign Up</span>
                        <form>
                            <div className="inputan">
                                <i className="fas fa-user" />
                                <input type="text" placeholder="Username..."  ref="username" required />
                                <span className="bar" />
                            </div>
                            <div className="inputan">
                                <i className="fas fa-envelope" />
                                <input type="email" placeholder="Email..."  ref="email" required />
                                <span className="bar" />
                            </div>
                                <div className="inputan">
                                <i className="fas fa-lock" />
                                <input type="password" placeholder="Password..." ref="password" required />
                                <span className="bar" />
                            </div>
                            <div className="inputan">
                                <i className="fas fa-lock" />
                                <input type="password" placeholder="Confirm password..." ref="confirmPassword" required />
                                <span className="bar" />
                            </div>
                            <div className="inputan">
                                {this.renderBtnOrLoading()}
                            </div>
                            <div>
                                {this.renderErrorMessage()}
                            </div>
                            <div className="switch-login">
                                <p>Already have an account? <Link to="/login" style={{ textDecoration: 'none' }}><span>Login</span></Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        username:state.user.username,
        loading:state.user.loading,
        error:state.user.error,
        success : state.user.success
    }
}

export default connect(mapStateToProps,{onRegister})(Register)