import React from 'react'
import {connect} from 'react-redux'
import {resetUser,resetCount,cartCount} from '../1.actions'
import Cookie from 'universal-cookie'
import {Redirect,Link} from 'react-router-dom'

import '../support/css/Header1style.css'
import Logo from '../img/Logo.png'
  
const cookie = new Cookie()

class Header1 extends React.Component{
    //Ketika pertama kali mounting action creator cartCount dipanggil untuk menghitung jumlah item dalam cart, sehingga jika sebelumnya user
    // pernah memasukan item ke cart namun belum dicheckout sehingga data masih tersimpan ketika login kembali
    componentDidMount(){
        this.props.cartCount(this.props.username)
    }

    btnSignOut=()=>{
        //Ketika sign out maka cookie yang sebelumnya diset saat login akan di hapus
        cookie.remove('userData')
        //Kemudian action creator resetUser dipanggil untuk mereset global state ke INITIAL_STATEnya sehingga bisa redirect ke komponen Home
        this.props.resetUser()
        //Juga dilakukan resetCount agar saat user lain yang login maka cart dari user sebelumnya tidak masuk ke cart user tersebut 
        this.props.resetCount()
    }
              
    render(){
        if(this.props.username === ""){
            return <Redirect to="/"/>
        }
        if(this.props.role === 'admin'){
            return(
                <div className="container">
                    <div className="header fixed-top">
                        <Link to="/"><img className="logo" src={Logo} alt="logo"/></Link>
                        <Link to="/cart" className="cart"><i class="fas fa-shopping-cart"></i></Link><span>{this.props.cart}</span>
                        <input type="checkbox" id="chk"/>
                        <label for="chk" class="show-menu-btn">
                            <i className="fas fa-bars"></i>
                        </label>
                        <ul class="menu">
                            <span className="welcome">-{this.props.username} / Admin-</span>
                            <Link to="/managecategory"><span>Manage Category</span></Link>
                            <Link to="/manageauction"><span>Manage Auction</span></Link>
                            <Link to="/managetransactions"><span>Manage Transaction</span></Link>
                            <span onClick={this.btnSignOut}>Sign Out</span>
                            <label for="chk" className="hide-menu-btn">
                                <i className="fas fa-times"/>
                            </label>
                        </ul>
                    </div>
                </div>
            )
        }else if(this.props.role === 'user'){
            return(
                <div className="container">
                    <div className="header fixed-top">
                        <Link to="/"><img className="logo" src={Logo} alt="logo"/></Link>
                        <Link to="/cart" className="cart"><i class="fas fa-shopping-cart"></i></Link><span>{this.props.cart}</span>
                        <input type="checkbox" id="chk"/>
                        <label for="chk" class="show-menu-btn">
                            <i className="fas fa-bars"></i>
                        </label>
                        <ul class="menu">
                            <span className="welcome">-{this.props.username}-</span>
                            <Link to="/myauction"><span>My Auction</span></Link>
                            <Link to="/createauction"><span>Create Auction</span></Link>    
                            <Link to="/cart"><span>Cart</span></Link>
                            <Link to="/confirmation"><span>Transaction Confirmation</span></Link>
                            <Link to="/historytransaction"><span>History Transaction</span></Link>
                            <span onClick={this.btnSignOut}>Sign Out</span>
                            <label for="chk" className="hide-menu-btn">
                                <i className="fas fa-times"/>
                            </label>
                        </ul>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps=(state)=>{
    return{
      username: state.user.username,
      role : state.user.role,
      cart : state.cart.count
    }
  }

export default connect(mapStateToProps,{resetUser,resetCount,cartCount})(Header1)