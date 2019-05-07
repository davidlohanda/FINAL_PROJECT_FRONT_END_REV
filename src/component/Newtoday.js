import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {cartCount} from '../1.actions'
import CountDown from 'react-countdown-now'
import {Modal, ModalHeader, ModalBody} from 'reactstrap';

import Header1 from './Header1'
import Footer from './Footer'

class Newtoday extends React.Component{
    state = {todayAuction : [] , timer : [] , winner : [], modal : false, selected:0, duration:0, search:''}

    componentDidMount(){
        this.getTodayAuction()
        this.getWinner()
    }

    getWinner = () => {
        axios.get('http://localhost:2000/bidder/winner')
        .then((res) => {
            console.log(res.data)
            this.setState({winner : res.data})
        })
        .catch((err) => console.log(err))
    }

    getTodayAuction = () => {
        axios.get(`http://localhost:2000/auction/todayAuction`)
        .then((res) => {
            console.log(res.data)
            this.setState({todayAuction : res.data})
        })
        .catch((err) => console.log(err))
    }

    renderer = ({ days, hours, minutes, seconds, completed }) => {
        
        
        if (completed) {
          // Render a completed state
            // this.getWinner()
            return <span style={{color:'red'}}>auction complete</span>

        } else {
          // Render a countdown
          return <span style={{color:'#487eb0', fontWeight:600}}>{days}d:{hours}h:{minutes}m:{seconds}s</span>;
        }
      };

    
    onBtnBidClick = (val) => {
        axios.get(`http://localhost:2000/login/getUserByUsername?username=${this.props.username}`)
        .then((res) => {
            console.log(res.data)
            axios.put(`http://localhost:2000/bidder/makeABid/${val.id}`, {
                new_product_price : val.product_price + val.add_price,
                product_id : val.id,
                user_id :res.data[0].id
            })
            .then((res1)=>{
                alert(res1.data)
                this.getTodayAuction()
                this.getWinner()
            })
            .catch((err) => console.log(err))
        })
        .catch((err) => console.log(err))
    }

    updateAndDelete = (val) => {
        alert('masuk')
        axios.get(`http://localhost:2000/bidder/winner/${val.id}`)
        .then((res) => {
            if(res.data.length === 0){
                alert('no bidder!')
                axios.delete(`http://localhost:2000/auction/deleteCreateAuction?id=${val.id}&imageBefore=${val.product_image}`)
                .then((res) => {
                    console.log(res)
                    this.getAllAuction()
                })
                .catch((err) => console.log(err))
            }else{
            var dataCart = {
                user_id : res.data[0].user_id,
                product_id : res.data[0].product_id,
                bid_price : res.data[0].bid_price,
                product_name : res.data[0].product_name
            }
            axios.post('http://localhost:2000/bidder/addtocart' , dataCart)
            .then((res) => {
                this.props.cartCount(this.props.username)
                axios.delete(`http://localhost:2000/auction/deleteCreateAuction?id=${val.id}&imageBefore=${val.product_image}`)
                .then((res) => {
                    console.log(res)
                    this.getAllAuction()
                })
                .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
            }
        })
        .catch((err) => console.log(err))
    }

    renderSellAuction = () => {
        var arrFilter = this.state.todayAuction.filter((val) => {
            return val.product_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        })
        
        var jsx = arrFilter.map((val,i) => {
            
            var endDate =  Date.parse(val.duration)
            var now = new Date().getTime()
            var distance = endDate - now
            
            return (
                     <div className="card mt-4 mb-4 col-lg-3 col-md-5 col-12 ml-2" style={{fontSize:'15px', fontFamily:'Arial, Helvetica, sans-serif'}}>
                        <img onClick={()=>this.setState({modal:true, selected:i, duration:distance})} src={'http://localhost:2000/'+val.product_image} className="img-fluid" style={{height:'40vh',cursor:'pointer'}} alt="..." />
                        <div className="card-body">
                            <h5 onClick={()=>this.setState({modal:true, selected:i, duration:distance})} className="card-title text-center" style={{width:'100%',fontSize:'16px', fontWeight:700,cursor:'pointer'}}>{val.product_name}</h5>
                            <hr/>
                            <p className="card-text">Current Price : Rp.{val.product_price}</p>
                            
                            <label className="mt-3" style={{fontWeight:500}}>Current Winner :</label>
                            <p>{this.state.winner.length?
                                this.state.winner.map((w) => {
                                    return w.product_id===val.id?<p>{w.nama}</p>:null
                                }) : <p>-</p>
                            }</p>

                            <p><CountDown  date={Date.now() + distance} renderer={this.renderer} on onComplete={()=>this.updateAndDelete(val)}/></p>
                        <button style={{backgroundColor:'#000',color:'#fff', fontSize:'15px'}} className="btn" onClick={()=>this.onBtnBidClick(val)}>Bid for Rp.{val.product_price+val.add_price}</button>
                        </div>
                    </div>
            )
        })
        return jsx
    }
    
    render(){
        if(this.state.todayAuction.length === 0) {
            return(
                <div>
                    <Header1/>
                    <hr style={{marginBottom:'120px',border:'none'}}></hr>
                    <div className="mt-5 row justify-content-center">
                        <p className="mt-5" style={{textDecoration:'underline',color:'#95989A'}}>No new auction for today</p>
                    </div>
                    <Footer/>
                </div>
            )
        }else{
            return(
                <div>
                    <Header1/>
                    <hr style={{marginBottom:'120px',border:'none'}}></hr>
                    <span className="text-center" style={{display:'block'}}><i className="fas fa-search mr-2"></i><input ref="inputSearch" onChange={()=>this.setState({search : this.refs.inputSearch.value})}  style={{width:'40vw',height:'7vh',padding:'10px',outline:'none'}} type="text" placeholder="Search"></input></span>
                    <div className="mt-5 row justify-content-center">
                        {this.renderSellAuction()}

                            {/* =============MODAL================= */}
                            <div>
                            <Modal isOpen={this.state.modal} toggle={()=>{this.setState({modal : false})}} className={this.props.className}>
                            <ModalHeader toggle={()=>{this.setState({modal : false})}}>{this.state.todayAuction[this.state.selected].product_name}</ModalHeader>
                            <ModalBody>
                            <div className="img-fluid">
                                <img src={'http://localhost:2000/' + this.state.todayAuction[this.state.selected].product_image} width='100%' alt='broken' />
                            </div>
                            <div className='row'> 
                                <div className='col-md-12'>
                                    <label className="mt-3" style={{fontWeight:500}}>Current Price :</label>
                                    <p>Rp.{this.state.todayAuction[this.state.selected].product_price}</p>

                                    <label className="mt-3" style={{fontWeight:500}}>Product Description :</label>
                                    <p>{this.state.todayAuction[this.state.selected].product_desc}</p>

                                    <label className="mt-3" style={{fontWeight:500}}>Current Winner :</label>
                                    <p>{
                                    this.state.winner.map((w) => {
                                        return w.product_id===this.state.todayAuction[this.state.selected].id?<p>{w.nama}</p>:null
                                    })
                                }</p>
                                </div>
                                <div className="col-md-12 mt-3">
                                <p><CountDown  date={Date.now() + this.state.duration} renderer={this.renderer} on onComplete={()=>this.updateAndDelete(this.state.todayAuction[this.state.selected])}/></p>
                                <button style={{backgroundColor:'#000',color:'#fff', fontSize:'15px'}} className="btn btn-control" onClick={()=>this.onBtnBidClick(this.state.todayAuction[this.state.selected])}>Bid for Rp.{this.state.todayAuction[this.state.selected].product_price+this.state.todayAuction[this.state.selected].add_price}</button>
                                </div>
                            </div>
                            </ModalBody>
                            </Modal>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        username : state.user.username,
        cart : state.cart.count
    }
}

export default connect(mapStateToProps,{cartCount})(Newtoday)