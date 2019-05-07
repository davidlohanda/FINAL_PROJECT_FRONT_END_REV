import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import cookie from 'universal-cookie'
import {connect} from 'react-redux'
import {Modal, ModalHeader, ModalBody} from 'reactstrap';

import '../../support/css/Container.css'

const Cookie = new cookie()


class Cart extends React.Component{
    state={cart:[], modal : false}

    componentDidMount(){
        this.getDataCart()
    }

    getDataCart = () => {
        axios.get(`http://localhost:2000/bidder/getCart/${Cookie.get('userData')}`)
        .then((res) => {
            console.log(res.data)
            this.setState({cart : res.data})
        })
        .catch((err) => console.log(err))
    }
    
    renderJsx = () => {
        
        var jsx = this.state.cart.map((val,i) => {
            return(
                <tr>
                    <td>{i+1}</td>
                    <td>{val.product_name}</td>
                    <td>Rp.{val.bid_price}</td>
                </tr>
            )
        })
        return jsx
    }

    totalPrice = () => {
        var sum = 0
        for(var i = 0 ; i< this.state.cart.length ; i ++){
            sum+=  this.state.cart[i].bid_price
        }
        return sum
    }

    product = () => {
        var productObj = {}
        var product = []

        for(var i = 0 ; i< this.state.cart.length ; i ++){
            productObj = {}
            productObj.product = this.state.cart[i].product_name
            productObj.total = this.state.cart[i].bid_price
            product.push(productObj)
        }
        return product
    }


    checkOut = () => {
        this.setState({modal : true})
    }

    submitCheckOut = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        
        var checkoutDate = dd + '/' + mm + '/' + yyyy;


        var checkoutProduct = []
        for(let i = 0 ; i < this.product().length ; i++){
            checkoutProduct.push(this.product()[i])
            checkoutProduct[i].name = this.refs.name.value
            checkoutProduct[i].town = this.refs.town.value
            checkoutProduct[i].province = this.refs.province.value
            checkoutProduct[i].address = this.refs.town.value
            checkoutProduct[i].postalcode = this.refs.postalcode.value
            checkoutProduct[i].phone = this.refs.phone.value
            checkoutProduct[i].email = this.refs.email.value
            checkoutProduct[i].checkoutdate = checkoutDate
            checkoutProduct[i].enddate = (parseInt(dd)+1) + '/' + mm + '/' + yyyy
            checkoutProduct[i].code = `${Date.parse(today)}`
            checkoutProduct[i].user_id = this.state.cart[0].user_id
        }

        var data = {
            checkoutProduct,
            qty : this.product().length,
            total : this.totalPrice()
        }
        console.log(data)
        axios.post(`http://localhost:2000/bidder/checkout?username=${Cookie.get('userData')}` , data)
        .then((res) => {
            alert(res.data)
            this.getDataCart()
        })
        .catch((err) =>  console.log(err))
    }

    render(){
        if(this.state.cart.length === 0){
            return(
                <div>
                    <div>
                        <div className="top">
                        <div className="top-1"><Link to="/" style={{color:'#000'}}><i class="fas fa-arrow-left"></i></Link></div>
                        <div className="top-2">Cart</div>
                        <div className="top-3"></div>
                    </div>
                    <div className="mid">
                        <div className="mid-1"></div>
                        <div className="mid-2" style={{fontFamily:' Arial, Helvetica, sans-serif'}}>
                            <p style={{textAlign:'center', marginTop:'40vh', textDecoration:'underline',color:'#95989A'}}>You're cart is currently empty</p>
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
                        <div className="top-2">Cart</div>
                        <div className="top-3"></div>
                    </div>
                    <div className="mid">
                        <div className="mid-1"></div>
                        <div className="mid-2 text-center" style={{fontFamily:' Arial, Helvetica, sans-serif'}}>
                        <div className="container" style={{fontFamily:' Arial, Helvetica, sans-serif',fontSize:'15px'}}>
                                <table className="mt-5 mb-5 table">
                                <tr>
                                    <td>NO</td>
                                    <td>PRODUCT</td>
                                    <td>PRICE</td>
                                </tr>
                                {this.renderJsx()}
                                </table>
                                <p>Total Price : Rp.{this.totalPrice()}</p>
                                <button onClick={this.checkOut} className="btn mt-5" style={{color:'#fff', backgroundColor:'#000'}}>Checkout</button>
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

                {/* =============MODAL================= */}
                <div>
                        <Modal isOpen={this.state.modal} toggle={()=>{this.setState({modal : false})}} className={this.props.className}>
                        <ModalHeader toggle={()=>{this.setState({modal : false})}}><p>Billing Details</p></ModalHeader>
                        <ModalBody>
                        <div className="form-group">
                            <label htmlFor="productName">Name :</label>
                            <input type="text" className="form-control" id="name" placeholder="Your name here" ref="name" required />
                        </div>
                        <div className="form-group mt-4">
                            <label htmlFor="productName">Town :</label>
                            <input type="text" className="form-control" id="town" placeholder="Your town here" ref="town" required />
                        </div>
                        <div className="form-group mt-4">
                            <label htmlFor="productName">Province :</label>
                            <input type="text" className="form-control" id="province" placeholder="Your province here" ref="province" required />
                        </div>
                        <div className="form-group mt-4">
                            <label htmlFor="productName">Address :</label>
                            <input type="text" className="form-control" id="address" placeholder="Your address here" ref="address" required />
                        </div>
                        <div className="form-group mt-4">
                            <label htmlFor="productName">Postal Code :</label>
                            <input type="text" className="form-control" id="postalcode" placeholder="Your postal code here" ref="postalcode" required />
                        </div>
                        <div className="form-group mt-4">
                            <label htmlFor="productName">Phone :</label>
                            <input type="text" className="form-control" id="phone" placeholder="Your phone code here" ref="phone" required />
                        </div>
                        <div className="form-group mt-4">
                            <label htmlFor="productName">Email Address :</label>
                            <input type="text" className="form-control" id="email" placeholder="Your email code here" ref="email" required />
                        </div>
                        <div className="mt-4">
                            <button onClick={this.submitCheckOut} className="btn mt-5" style={{color:'#fff', backgroundColor:'#000'}}>Submit</button>
                        </div>
                        </ModalBody>
                        </Modal>
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

export default connect(mapStateToProps)(Cart)