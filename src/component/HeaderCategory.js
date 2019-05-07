import React from 'react'
import {Link} from 'react-router-dom'

import '../support/css/HeaderCategorystyle.css'
import iconProp from '../img/prop.png'
import iconAuto from '..//img/auto.png'
import iconWat from '../img/wat.png'

class HeaderCategory extends React.Component{
    render(){
        return(
            <div className="header-category-main-container text-center">
                <p className="text-center cat-text-title">
                    Category
                </p>
                <div className="container header-category-second-container">
                    <div className="header-category-content-1">
                        <img src={iconProp} alt="icon-prop" className="cat-img"/>
                        <Link to="/productcategory/1" style={{textDecoration:'none'}}><p className="cat-text">Property</p></Link>
                    </div>
                    <div className="header-category-content-2">
                        <img src={iconAuto} alt="icon-prop" className="cat-img"/>
                        <Link to="/productcategory/2" style={{textDecoration:'none'}}><p className="cat-text">Automotive</p></Link>
                    </div>
                    <div className="header-category-content-3">
                        <img src={iconWat} alt="icon-prop" className="cat-img"/>
                        <Link to="/productcategory/3" style={{textDecoration:'none'}}><p className="cat-text">Watch</p></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default HeaderCategory