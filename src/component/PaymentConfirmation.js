import React from 'react'
import axios from 'axios';
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import {onLogin,resetUser} from '../1.actions'


class PaymentConfirmation extends React.Component{
    state={imageFile : null, history : []}
    
    onChangeHandler = (e) => {
        this.setState({imageFile : e.target.files[0]})
    }

    submitConfirmation = () => {
        var data =  {
            name : this.props.username,
            code : this.refs.noinvoice.value
        }

        var fd = new FormData()
        fd.append('confirmation' , this.state.imageFile)
        fd.append('data' , JSON.stringify(data))

        axios.post('http://localhost:2000/bidder/submitConfirmation' , fd) 
        .then((res) => {
            alert(res.data)
            this.setState({imageFile : null})
            this.props.resetUser()
        })  
        .catch((err) =>  console.log(err))     
    }

    

    btnLoginClick=()=>{
        var username = this.refs.username.value
        var password = this.refs.password.value
        this.props.onLogin(username,password)
        this.refs.username.value=''
        this.refs.password.value=''

        axios.get(`http://localhost:2000/login/getUserByUsername?username=${username}`)
        .then((res1)=>{
            console.log(res1.data)
            axios.get(`http://localhost:2000/bidder/history/${res1.data[0].id}`)
            .then((res) => {
                this.setState({history : res.data})
            })
            .catch((err) => console.log(err))
        })
        .catch((err)=>console.log(err))
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
    
    renderNoInvoice = () => {
        var noinvoice = this.state.history.map((val) => {
            return val.code
        })
        var jsx = [...new Set(noinvoice)].map((val) => {
            return(
                <option>{val}</option>
            )
        })
        return jsx
    }

    render(){
            if(this.props.username){
                return(
                    <div className="container jumbotron mt-5">
                        <p>Hi, {this.props.username}</p>
                        <label for="noinvoice">
                            Transacation to confirm :
                        </label>
                        <p>
                            <select id="noinvoice" ref="noinvoice">
                                <option>Invoice Number</option>
                                {this.renderNoInvoice()}
                            </select>
                        </p>
                        <p>Please submit your proof of payment :</p>
                        <p><input ref="confirmation" type="file" onChange={this.onChangeHandler}/></p>
                        <p><input onClick={this.submitConfirmation} className="btn btn-control btn-primary mt-3" type="button" value="Submit"/></p>
                    </div>
                )
            }else{
                return(
                    <div className="main animated fadeIn">
                        <div id="bungkus">
                            <div className="tempat-form">
                                <span className="form-title">Login To Submit</span>
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
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }
    }
}

const mapStateToProps = (state) => {
    return{
        username : state.user.username,
        loading : state.user.loading,
        error : state.user.error
    }
}

export default connect(mapStateToProps,{onLogin,resetUser})(PaymentConfirmation)