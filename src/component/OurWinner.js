import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

import '../support/css/Container.css'

class OurWinners extends React.Component{
    state={winners:[]}

    componentDidMount(){
        this.getAllWinners()
    }

    getAllWinners = () => {
        axios.get('http://localhost:2000/bidder/ourwinner')
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
                    <td>{val.product_name} </td>
                    <td>Rp.{val.bid_price} </td>
                </tr>
            )
        })
        return jsx
    }

    render(){
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
                            <div className="top-2">My Auction</div>
                            <div className="top-3"></div>
                        </div>
                        <div className="mid">
                            <div className="mid-1"></div>
                            <div className="mid-2 text-center">
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
                            <div className="bottom-2"></div>
                            <div className="bottom-3"></div>
                        </div>
                    </div>
    
            )
        }
    }
}

export default OurWinners