import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import cookie from 'universal-cookie'

import '../../support/css/Container.css'

const Cookie = new cookie()


class HistoryTransaction extends React.Component{
    state={history:[]}

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
    
    render(){
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
                        <p style={{textAlign:'center', marginTop:'40vh', textDecoration:'underline',color:'#95989A'}}>No history transaction yet</p>
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
                            <div className="mid-2 text-center">
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