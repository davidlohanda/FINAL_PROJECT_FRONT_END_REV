import React from 'react'
import {Link} from 'react-router-dom'

import '../support/css/HeaderChoosestyle.css'

class HeaderChoose extends React.Component{
    render(){
        return(
            <div className="header-choose-main-container">
                <div className="header-choose-content-1 text-center">
                    <Link to="/allcategories" style={{textDecoration:'none'}}><p className="choose-text">All Categories</p></Link>
                </div>
                <div className="header-choose-content-2 text-center">
                    <Link to="/newtoday" style={{textDecoration:'none'}}><p className="choose-text">New Today</p></Link>
                </div>
                <div className="header-choose-content-3 text-center">
                    <Link to="/ourwinners" style={{textDecoration:'none'}}><p className="choose-text">Our Winners</p></Link>
                </div>
            </div>
        )
    }
}

export default HeaderChoose