import React from 'react';
import './App.css';
import {Route,withRouter,Switch} from 'react-router-dom'
import Cookie from 'universal-cookie'
import {keepLogin,cookieChecked} from './1.actions'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import ScrollToTop from './component/ScrollToTop'

import MainAuction from './component/MainAuction';
import Home from './component/Home';
import Login from './component/Login';
import Register from './component/Register';
import ProductCategoryList from './component/ProductCategoryList';
import AllCategories from './component/Allcategories';
import Newtoday from './component/Newtoday';
import MyAuction from './component/User/MyAuction'
import CreateAuction from './component/User/CreateAuction';
import Cart from './component/User/Cart';
import HistoryTransaction from './component/User/HistoryTransaction';
import TransactionConfirm from './component/User/TransactionConfirm';
import PaymentConfirmation from './component/PaymentConfirmation';
import OurWinners from './component/OurWinner';
import ManageCategory from './component/Admin/ManageCategory';
import ManageProduct from './component/Admin/ManageProduct';
import ManageTransaction from './component/Admin/ManageTransaction';


const cookie = new Cookie()


class  App extends React.Component{
  
  componentDidMount(){
    var dataCookie=cookie.get('userData') 
    if(dataCookie!==undefined){
      this.props.keepLogin(dataCookie)
    }else{
      this.props.cookieChecked()
    }
  }
  
  render(){
    if(this.props.cookie){
      return (
        <div>
          <ScrollToTop>
            <Switch>
              <Route path="/" component={MainAuction} exact/>
              <Route path="/home" component={Home} exact/>
              <Route path="/login" component={Login} exact/>
              <Route path="/register" component={Register} exact/>
              <Route path="/productcategory/:category" component={ProductCategoryList} exact/>
              <Route path="/allcategories" component={AllCategories} exact/>
              <Route path="/newtoday" component={Newtoday} exact/>
              <Route path="/ourwinners" component={OurWinners} exact/>
              <Route path="/myauction" component={MyAuction} exact/>
              <Route path="/createauction" component={CreateAuction} exact/>
              <Route path="/cart" component={Cart} exact/>
              <Route path="/historytransaction" component={HistoryTransaction} exact/>
              <Route path="/confirmation" component={TransactionConfirm} exact/>
              <Route path="/paymentconfirmation" component={PaymentConfirmation} exact/>
              <Route path="/managecategory" component={ManageCategory} exact/>
              <Route path="/manageauction" component={ManageProduct} exact/>
              <Route path="/managetransactions" component={ManageTransaction} exact/>
            </Switch>
          </ScrollToTop>
        </div>
      );
    }else{
      return <div className='centervh'>
      <Loader
        type="Bars"
        color="#00BFFF"
        height="100"	
        width="100"
        />
      </div>
    }
  }
}

const mapStateToProps = (state) => {
  return{
    cookie : state.user.cookie
  }
}

export default withRouter(connect(mapStateToProps,{keepLogin,cookieChecked})(App));
