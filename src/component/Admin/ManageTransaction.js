import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

import '../../support/css/Container.css'

class ManageTransaction extends React.Component{
    state={trasactions:[] , dataEdit : 0, selectedEdit : null}
    
    componentDidMount(){
        this.getTransactions()
    }
    
    getTransactions = () => {
        axios.get(`http://localhost:2000/admin/transactions`)
        .then((res) => {
            this.setState({trasactions : res.data})
        })
        .catch((err) => console.log(err))
    }

    onBtnSaveClick = () => {
        var data = {
            status : this.refs.statusEdit.value
        }
        axios.put(`http://localhost:2000/admin/editTransaction?id=${this.state.selectedEdit}`, data)
            .then((res) => {
                alert(res.data)
                this.setState({selectedEdit:null})
                this.getTransactions()
            })
            .catch((err) => console.log(err))
    }

    renderJsx = () => {
        var jsx = this.state.trasactions.map((val,i) => {
            if(this.state.selectedEdit === val.id){
                return <tr>
                            <td>{i+1}</td>
                            <td>{val.code}</td>
                            <td>{val.name}</td>
                            <td>{val.product}</td>
                            <td>{val.date}</td>
                            <td>Rp.{val.price}</td>
                            <td> <input type = 'text' defaultValue={val.status} className='form-control'  ref='statusEdit' style={{fontSize:'15px', marginTop:'-2px'}}/>  </td>
                            <td><input type = 'button' className='btn btn-info'  value='save' onClick={this.onBtnSaveClick} style={{fontSize:'15px', marginTop:'-2px'}}/></td>
                            <td> <input type = 'button' className='btn btn-danger' value='cancel' onClick={()=>this.setState({selectedEdit:null})} style={{fontSize:'15px', marginTop:'-2px'}}/> </td>        
                        </tr>
            }else{
                return(
                    <tr>
                        <td>{i+1}</td>
                        <td>{val.code}</td>
                        <td>{val.name}</td>
                        <td>{val.product}</td>
                        <td>{val.date}</td>
                        <td>Rp.{val.price}</td>
                        <td>{val.status}</td>
                        <td> <input type = 'button' className='btn btn-info'  value='edit' onClick={()=>{this.setState({selectedEdit : val.id , dataEdit : val})}} style={{fontSize:'15px', marginTop:'-2px'}}/> </td>        
                        <td></td>
                  </tr>
                )
            }
        })
        return jsx
    }
    
    render(){
        return(
            <div>
                <div className="top">
                <div className="top-1"><Link to="/" style={{color:'#000'}}><i class="fas fa-arrow-left"></i></Link></div>
                <div className="top-2">Manage Transactions</div>
                <div className="top-3"></div>
            </div>
            <div className="mid">
                <div className="mid-1"></div>
                <div className="mid-2" style={{fontFamily:' Arial, Helvetica, sans-serif'}}>
                    <div className="container" style={{fontFamily:' Arial, Helvetica, sans-serif',fontSize:'15px'}}>
                        <table className="mt-5 mb-5 table">
                            <tr>
                                <td>NO</td>
                                <td>NO INVOICE</td>
                                <td>NAME</td>
                                <td>PRODUCT</td>
                                <td>DATE</td>
                                <td>PRICE</td>
                                <td>STATUS</td>
                                <td></td>
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
        )
    }
}

export default ManageTransaction