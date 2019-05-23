import React from 'react'
import {Link,Redirect} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import cookie from 'universal-cookie'
import QueryString from 'query-string'

import '../../support/css/Container.css'

const Cookie = new cookie()


class HistoryTransaction extends React.Component{
    state={history:[] , search : ''}

    componentDidMount(){
        this.getHistory()
        this.getDataUrl()
    }

    getHistory = () => {
        axios.get(`http://localhost:2000/login/getUserByUsername?username=${Cookie.get('userData')}`)
        .then((res1)=>{
            console.log(res1.data)
            if(this.state.search){
                axios.get(`http://localhost:2000/bidder/history?id=${res1.data[0].id}&date=${this.state.search}`)
                .then((res) => {
                    this.setState({history : res.data})
                })
                .catch((err) => console.log(err))
            }else{
                axios.get(`http://localhost:2000/bidder/history/${res1.data[0].id}`)
                .then((res) => {
                    this.setState({history : res.data})
                })
                .catch((err) => console.log(err))
            }
        })
        .catch((err)=>console.log(err))
    }

    totalPrice = () => {
        var total = 0
        for(let i = 0 ; i < this.state.history.length ; i++){
            total += this.state.history[i].price
        }
        return total
    }

    renderJsx = () => {
        var jsx = this.state.history.map((val,i) => {
            return(
                <tr>
                    <td>{i+1}</td>
                    <td>{val.code}</td>
                    <td>{val.product}</td>
                    <td>{val.date}</td>
                    <td>Rp.{val.price}</td>
                    <td>{val.status}</td>
                </tr>
            )
        })
        return jsx
    }

    btnSearchClick = () => {
        // var x = this.refs.date.value.split('-').reverse().join('/')
        var x = this.state.search.split('-').reverse().join('/')
        axios.get(`http://localhost:2000/login/getUserByUsername?username=${Cookie.get('userData')}`)
        .then((res1)=>{
            if(x){
                console.log(res1.data)
                axios.get(`http://localhost:2000/bidder/history?id=${res1.data[0].id}&date=${x}`)
                .then((res) => {
                    var newLink = `/historytransaction`
                    var params = []
                        params.push({
                            params : 'date',
                            value : x
                        })
                        newLink += '?' + params[0].params + '=' + params[0].value
                        console.log(newLink)
                        this.props.history.push(newLink)

                    console.log(res.data)
                    this.setState({history : res.data})
                })
                .catch((err) => console.log(err))
            }else{
                axios.get(`http://localhost:2000/bidder/history/${res1.data[0].id}`)
                .then((res) => {
                    var newLink = `/historytransaction`
                    this.props.history.push(newLink)
                    
                    console.log(res.data)
                    this.setState({history : res.data})
                })
                .catch((err) => console.log(err))
            }
        })
        .catch((err)=>console.log(err))
    }



    getDataUrl = () => {
    if(this.props.location.search){
            var obj = QueryString.parse(this.props.location.search)
            if(obj.date){
                this.setState({search : obj.date})
            }
        } 
    }

    
    render(){
        if(this.props.username === ''){
            return <Redirect to="/login"/>
        }
        if(this.state.history.length === 0){
            return(
                <div>
                    <div className="top">
                    <div className="top-1"><Link to="/" style={{color:'#000'}}><i class="fas fa-arrow-left"></i></Link></div>
                    <div className="top-2">History Transaction</div>
                    <div className="top-3"></div>
                </div>
                <div className="mid">
                    <div className="mid-1"></div>
                    <div className="mid-2" style={{fontFamily:' Arial, Helvetica, sans-serif'}}>
                        <span className="text-center mt-5" style={{display:'block',fontFamily:'Arial,helvetica,sans-serif',fontSize:'15px'}}><i className="fas fa-search mr-2"></i><input value={this.state.search}  onChange={() => this.setState({search : this.refs.date.value})} ref="date" type="date"  style={{width:'30vw',height:'5vh',padding:'10px',outline:'none',border:'1px solid #95989A'}}></input><button onClick={this.btnSearchClick} style={{height:'5vh',width:'6vw'}}>search</button></span>
                        <p style={{textAlign:'center', marginTop:'20vh', textDecoration:'underline',color:'#95989A'}}>No history transaction</p>
                    </div>
                    <div className="mid-3"></div>
                </div>
                <div className="bottom">
                    <div className="bottom-1"></div>
                    <div className="bottom-2"></div>
                    <div className="bottom-3"></div> 
                </div>
            </div>
            )
        }else{
            return(
                <div>
                        <div className="top">
                            <div className="top-1"><Link to="/" style={{color:'#000'}}><i class="fas fa-arrow-left"></i></Link></div>
                            <div className="top-2">History Transaction</div>
                            <div className="top-3"></div>
                        </div>
                        <div className="mid">
                            <div className="mid-1"></div>
                            <div className="mid-2 text-center" style={{overflowY:'auto'}}>
                                <span className="text-center mt-5" style={{display:'block',fontFamily:'Arial,helvetica,sans-serif',fontSize:'15px'}}><i className="fas fa-search mr-2"></i><input  ref="date" type="date"  value={this.state.search}  onChange={() => this.setState({search : this.refs.date.value})}  style={{width:'30vw',height:'5vh',padding:'10px',outline:'none',border:'1px solid #95989A'}}></input><button onClick={this.btnSearchClick} style={{height:'5vh',width:'6vw'}}>search</button></span>
                                <div className="container" style={{fontFamily:' Arial, Helvetica, sans-serif',fontSize:'15px'}}>
                                <table className="mt-5 mb-5 table">
                                <tr>
                                    <td>NO</td>
                                    <td>NO INVOICE</td>
                                    <td>PRODUCT</td>
                                    <td>DATE</td>
                                    <td>TOTAL</td>
                                    <td>STATUS</td>
                                </tr>
                                {this.renderJsx()}
                                </table>
                                
                                </div>
                            </div>
                            <div className="mid-3">

                            </div>
                        </div>
                        <div className="bottom">
                            <div className="bottom-1"></div>
                            <div className="bottom-2"></div>
                            <div className="bottom-3"></div>
                        </div>
                    </div>
    
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        username : state.user.username
    }
}

export default connect(mapStateToProps)(HistoryTransaction)