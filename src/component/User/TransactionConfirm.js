import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import cookie from 'universal-cookie'


const Cookie = new cookie()

class TransactionConfirm extends React.Component{
    state={imageFile : null, history:[]}


    componentDidMount(){
        this.getHistory()
    }

    getHistory = () => {
        axios.get(`http://localhost:2000/login/getUserByUsername?username=${Cookie.get('userData')}`)
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
    }
}

const mapStateToProps = (state) => {
    return{
        username : state.user.username
    }
}

export default connect(mapStateToProps)(TransactionConfirm)