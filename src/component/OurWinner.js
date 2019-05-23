import React from 'react'
import {Link,Redirect} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'

import '../support/css/Container.css'

class OurWinners extends React.Component{
    state={winners:[] , page : 0, slice : 5, navpage : 1}

    componentDidMount(){
        this.getAllWinners()
    }

    getAllWinners = () => {
        axios.get('http://localhost:2000/bidder/allwinners')
        .then((res) => {
            this.setState({winners : res.data})
        })
        .catch((err) => console.log(err))
    }

    renderJsx = () => {
        var jsx = this.state.winners.map((val,i) => {
            return(
                <tr>
                    <td>{i+1}</td>
                    <td>{val.username}</td>
                    <td>{val.product} </td>
                    <td>Rp.{val.price} </td>
                </tr>
            )
        })
        return jsx.slice(this.state.page, this.state.slice)
    }

    prevButton = () => {
        if(this.state.page !== 0 && this.state.slice !== 5){
            this.setState({page : this.state.page - 5, slice : this.state.slice - 5, navpage : this.state.navpage - 1})
        }
    }

    nextButton = () => {
        if(this.state.slice < this.state.winners.length){
            this.setState({page : this.state.page + 5, slice : this.state.slice + 5, navpage : this.state.navpage + 1})
        }
    }


    render(){
        if(this.props.username === ''){
            return <Redirect to="/login"/>
        }
        if(this.state.winners.length === 0){
            return(
                <div>
                    <div className="top">
                    <div className="top-1"><Link to="/" style={{color:'#000'}}><i class="fas fa-arrow-left"></i></Link></div>
                    <div className="top-2">Our Winners</div>
                    <div className="top-3"></div>
                </div>
                <div className="mid">
                    <div className="mid-1"></div>
                    <div className="mid-2" style={{fontFamily:' Arial, Helvetica, sans-serif'}}>
                        <p style={{textAlign:'center', marginTop:'40vh', textDecoration:'underline',color:'#95989A'}}>No winner yet</p>
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
                            <div className="top-2">Our Winners</div>
                            <div className="top-3"></div>
                        </div>
                        <div className="mid">
                            <div className="mid-1"></div>
                            <div className="mid-2 text-center" style={{overflowY:'auto'}}>
                                <div className="container" style={{fontFamily:' Arial, Helvetica, sans-serif',fontSize:'15px'}}>
                                <table className="mt-5 mb-5 table">
                                <tr>
                                    <td>NO</td>
                                    <td>NAME</td>
                                    <td>PRODUCT</td>
                                    <td>PRICE</td>
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
                            <div className="bottom-2 text-center" style={{fontSize:'15px', fontFamily:'Arial,helvetica,sans-serif'}}>
                            {this.state.navpage===1?null:<span onClick={this.prevButton} style={{fontSize:'20px', cursor:'pointer'}}>&laquo;</span>} <span style={{margin : '0 5px'}}>{this.state.navpage}/{Math.ceil(this.state.winners.length/5)}</span> {this.state.navpage === Math.ceil(this.state.winners.length/5)?null:<span onClick={this.nextButton} style={{fontSize:'20px', cursor:'pointer'}}>&raquo;</span>}
                            </div>
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

export default connect(mapStateToProps)(OurWinners)