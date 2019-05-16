import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import cookie from 'universal-cookie'
import {Redirect} from 'react-router-dom'


const Cookie = new cookie()

class TransactionConfirm extends React.Component{
    state={imageFile : null, history:[], code: null, detail : []}


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

    dropdown = () => {
        this.setState({code : this.refs.noinvoice.value})
        if(this.refs.noinvoice.value === 'Invoice Number'){
            this.setState({detail : []})
        }else{
            axios.get(`http://localhost:2000/bidder/invoicecode?code=${this.refs.noinvoice.value}`)
            .then((res) => {
                this.setState({detail : res.data})
            })
            .catch((err) => console.log(err))
        }
    }

    totalPrice = () => {
        var total = 0
        for(let i = 0 ; i < this.state.detail.length ; i++){
            total += this.state.detail[i].price
        }
        return <td colSpan="3">Total : Rp.{total}</td>
    }
    renderDetail = () => {
        var jsx = this.state.detail.map((val) => {
            return(
                <tr>
                    <td>{val.product}</td>
                    <td>Rp.{val.price}</td>
                </tr>
            )
        })
        return jsx
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
            this.setState({imageFile : null , detail : []})
            this.refs.confirmation.value = null
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
        if(this.props.username === ''){
            return   <Redirect to="/login"/>        
        }
        return(
            <div className="container jumbotron">
                <p>Hi, {this.props.username}</p>
                <label for="noinvoice">
                Transacation to confirm :
                </label>
                <p>
                    <select id="noinvoice" ref="noinvoice" onChange={this.dropdown}>
                        <option>Invoice Number</option>
                        {this.renderNoInvoice()}
                    </select>
                </p>
                <p>Please submit your proof of payment :</p>
                <p><input ref="confirmation" type="file" onChange={this.onChangeHandler}/></p>
            {this.state.detail.length > 0?
                <table className="table table-light table-active mt-5">
                    <thead>
                        <td colSpan="3">Transaction Detail</td>
                    </thead>
                    <thead>
                        <td colSpan="3">Checkout date : {this.state.detail[0].date}</td>
                    </thead>
                    <thead>
                        {this.totalPrice()}
                    </thead>
                    <thead>
                        <td>Product</td>
                        <td>Price</td>
                    </thead>
                    <tbody>
                        {this.renderDetail()}
                    </tbody>
                    <tfoot>
                        
                    </tfoot>
                </table> : null}
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