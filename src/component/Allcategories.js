import React from 'react'

import Header1 from './Header1';
import Shop from './Shop'
import Footer from './Footer'

class AllCategories extends React.Component{
    render(){
        return(
            <div>
                <Header1/>
                <hr style={{marginBottom:'120px',border:'none'}}></hr>
                <Shop/>
                <Footer/>
            </div>
        )
    }
}

export default AllCategories