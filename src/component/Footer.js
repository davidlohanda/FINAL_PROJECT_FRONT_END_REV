import React from 'react'
import '../support/css/Footerstyle.css'

class Footer extends React.Component{
    render(){
        return(
            <div className="footer-main">
            <div className="footer-main-container">
                <div className="footer-content-1">
                    <p>Address : Headquarters 1120 N Street Sacramento</p>
                    <p>Telephone : 916-654-5266	</p>
                    <p>Fax : 252525252</p>
                    <p>Mail : gotcha@gmail.com</p>
                </div>
                <div className="footer-content-2">
                    <p>Follow us on :</p>
                    <span><i class="fab fa-facebook-f"></i></span>
                    <span><i class="fab fa-twitter"></i></span>
                    <span><i class="fab fa-instagram"></i></span>
                    <p><i>"Bidders are winners"</i></p>
                </div>
            </div>
                <div className="container">
                <hr width="80%" style={{margin:'0 auto'}}></hr>
                </div>
                <p className="text-center mt-3">-David Lohanda &copy; 2019-</p>
            </div>
        )
    }
}

export default Footer