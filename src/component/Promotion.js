import React from 'react'
import Orang from '../img/manwoman.png'
import Kakek from '../img/old.png'
import Nenek from '../img/oldw.png'

class Promotion extends React.Component{
    render(){
        return(
            <div className="container text-center" style={{marginTop : '100px'}}>
                <img src={Orang} height="150px" alt=""/>
                <img src={Kakek} height="150px" alt=""/>
                <img src={Nenek} height="150px" alt=""/>
            </div>
        )
    }
}

export default Promotion