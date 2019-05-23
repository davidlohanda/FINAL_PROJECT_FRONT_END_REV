import React from 'react'
import {Link,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {onLogin,cartCount} from '../1.actions'
import Loader from 'react-loader-spinner'
import Cookie from 'universal-cookie'


import '../support/css/Loginstyle.css'

const cookie = new Cookie()

class Login extends React.Component{
    //Saat login akan dipanggil action creator onLogin yang akan memicu perubahan global state sehingga pada saat itu
    //digunakan componentWillReceiveProps untuk mengenerate cookie berisi username dari user yang login yang nanti digunakan untuk
    //melakukan keep login saat direload dengan action creator keepLogin
    //path : '/' digunakan agar cookie bisa diakses di semua route

    componentWillReceiveProps(newProps){
        cookie.set('userData',newProps.username,{path:'/'})
    }
    
    

    btnLoginClick=()=>{
        //get semua input dari user
        var username = this.refs.username.value
        var password = this.refs.password.value
        //panggil action creator onLogin agar bisa login / mencatat global state sehingga bisa redirect
        this.props.onLogin(username,password)
        //jika user sebelumnya pernah add to cart namun belum checkout maka setiap login cart akan tetap terisi dengan actio creator cartCount
        this.props.cartCount(username)
        this.refs.username.value=''
        this.refs.password.value=''
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
        return <button onClick={this.btnLoginClick}><i className="fab fa-telegram-plane" /></button>
    }

    renderErrorMessage=()=>{
        if(this.props.error !== ''){
            return <div className="alert alert-danger mt-3" role="alert" style={{fontSize:'22px', textAlign:'center'}}>
                        {this.props.error}
                    </div>
        }
    }

    render(){
        if(this.props.username && !this.props.error){
            return <Redirect to="/" />
        }
        return(
            <div className="main animated fadeIn">
                <div id="bungkus">
                    <div className="tempat-form">
                        <span className="form-title">Login</span>
                        <form>
                            <div className="inputan">
                                <i className="fas fa-user" />
                                <input type="text" placeholder="Username..." ref="username" required />
                                <span className="bar" />
                            </div>
                            <div className="inputan">
                                <i className="fas fa-lock" />
                                <input type="password" placeholder="Password..." ref="password" required />
                                <span className="bar" />
                            </div>
                            <div className="inputan">
                                {this.renderBtnOrLoading()}
                            </div>
                            <div>
                                {this.renderErrorMessage()}
                            </div>
                            <div className="switch-login">
                                <p>Are you a new member? <Link to='/register' style={{ textDecoration: 'none' }}><span>Sign Up</span></Link></p>
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
        username : state.user.username,
        loading : state.user.loading,
        error : state.user.errorLogin
    }
}

export default connect(mapStateToProps,{onLogin,cartCount})(Login)
