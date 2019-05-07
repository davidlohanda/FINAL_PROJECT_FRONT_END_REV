import React from 'react'
import '../support/css/Howstyle.css'
import iconHow from '../img/how.png'

class How extends React.Component{
    render(){
        return(
            <div className="how-main-container container">
                <div className="how-content-1">
                    <p className="how-title">How it works?</p>
                    <img src={iconHow} className="how-img" alt="how"/>
                </div>
                <div className="how-content-2">
                    <div className="howto">
                        <p className="how-title"><i class="fas fa-search"></i>&nbsp;&nbsp;Find Your Products</p>
                        <p>Search , track and reasearch your products</p>
                    </div>
                    <div className="howto">
                        <p className="how-title"><i className="fas fa-money-bill-wave" />&nbsp;&nbsp;Start Bidding</p>
                        <p>Bid at live and online auctions</p>
                    </div>
                    <div className="howto">
                        <p className="how-title"><i className="far fa-laugh-beam" />&nbsp;&nbsp;Win The Auction</p>
                        <p>We're here to support you post-auction</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default How