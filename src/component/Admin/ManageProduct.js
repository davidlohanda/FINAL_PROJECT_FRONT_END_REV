import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

import '../../support/css/Container.css'


class ManageProduct extends React.Component{
    state={auction : []}

    componentDidMount(){
        this.getAllAuction()
    }

    getAllAuction = () => {
        axios.get('http://localhost:2000/auction/userAuction')
        .then((res) => {
            this.setState({auction:res.data})
        })
        .catch((err) => console.log(err))
    }

    renderJsx = () => {
        var jsx = this.state.auction.map((val,i) => {
            return(
                <tr>
                    <td>{i+1}</td>
                    <td>{val.owner}</td>
                    <td> <img src = {'http://localhost:2000/' + val.product_image} 
                      width = '50px' alt=""/>  
                    </td>
                    <td>{val.product_name}</td>
                    <td>{val.category}</td>
                    <td>Rp.{val.product_price}</td>
                    <td><input type = 'button' className='btn btn-danger' value='delete' onClick={()=>this.onBtnDeleteClick(val)} style={{fontSize:'16px', marginTop:'-6px'}}/></td>
                </tr>
            )
        })
        return jsx
    }

    onBtnDeleteClick = (val) => {
        console.log(val.product_image)
        axios.delete(`http://localhost:2000/auction/deleteCreateAuction?id=${val.id}&imageBefore=${val.product_image}`)
        .then((res)=>{
            alert(res.data)
            this.getAllAuction()
        })
        .catch((err) => console.log(err))
    }

    render(){
        if(this.state.auction.length === 0){
            return(
                <div>
                    <div>
                        <div className="top">
                        <div className="top-1"><Link to="/" style={{color:'#000'}}><i class="fas fa-arrow-left"></i></Link></div>
                        <div className="top-2">Manage User Auction</div>
                        <div className="top-3"></div>
                    </div>
                    <div className="mid">
                        <div className="mid-1"></div>
                        <div className="mid-2" style={{fontFamily:' Arial, Helvetica, sans-serif'}}>
                            <p style={{textAlign:'center', marginTop:'40vh', textDecoration:'underline'}}>No auction created yet</p>
                        </div>
                        <div className="mid-3"></div>
                    </div>
                    <div className="bottom">
                        <div className="bottom-1"></div>
                        <div className="bottom-2"></div>
                        <div className="bottom-3"></div> 
                    </div>
                </div>
                </div>
            )
        }else{
            return(
                <div>
                    <div>
                        <div className="top">
                        <div className="top-1"><Link to="/" style={{color:'#000'}}><i class="fas fa-arrow-left"></i></Link></div>
                        <div className="top-2">Manage User Auction</div>
                        <div className="top-3"></div>
                    </div>
                    <div className="mid">
                        <div className="mid-1"></div>
                        <div className="mid-2 text-center" style={{fontFamily:' Arial, Helvetica, sans-serif',overflowY:'auto'}}>
                        <div className="container" style={{fontFamily:' Arial, Helvetica, sans-serif',fontSize:'15px'}}>
                                <table className="mt-5 mb-5 table">
                                <tr>
                                    <td>NO</td>
                                    <td>OWNER</td>
                                    <td>IMAGE</td>
                                    <td>PRODUCT</td>
                                    <td>CATEGORY</td>
                                    <td>PRICE</td>
                                    <td>DELETE</td>
                                </tr>
                                {this.renderJsx()}
                                </table>
                                </div>
                        </div>
                        <div className="mid-3"></div>
                    </div>
                    <div className="bottom">
                        <div className="bottom-1"></div>
                        <div className="bottom-2"></div>
                        <div className="bottom-3"></div> 
                    </div>
                </div>
                </div>
            )
        }
    }
}

export default ManageProduct