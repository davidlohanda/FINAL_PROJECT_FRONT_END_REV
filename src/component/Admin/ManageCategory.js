import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import '../../support/css/Container.css'

class ManageCategory extends React.Component{
    state={myCategory:[], selectedEdit : null, dataEdit : {}}
    
    componentDidMount(){
        this.getMyCategory()
    }
    
    getMyCategory = () => {
        axios.get(`http://localhost:2000/admin/getMyCategory`)
        .then((res) => {
            this.setState({myCategory : res.data})
        })
        .catch((err) => console.log(err))
    }

    onBtnSaveClick = () => {
        var data = {
            category : this.refs.categoryEdit.value
        }
        axios.put(`http://localhost:2000/admin/editCategory?id=${this.state.dataEdit.id}`, data)
            .then((res) => {
                alert(res.data)
                this.setState({selectedEdit : null})
                this.getMyCategory()
            })
            .catch((err) => console.log(err))
    }

    onBtnDeleteClick = (val) => {
        axios.delete(`http://localhost:2000/admin/deleteCategory?id=${val.id}`)
        .then((res)=>{
            alert(res.data)
            this.getMyCategory()
        })
        .catch((err) => console.log(err))
    }

    onBtnAddCategoryClick = () => {
        var data = {
            category : this.refs.addCategory.value
        }
        axios.post('http://localhost:2000/admin/addCategory' , data)
        .then((res) => {
            alert(res.data)
            this.getMyCategory()
        })
        .catch((err) => console.log(err))
    }

    renderJsx = () => {
        var jsx = this.state.myCategory.map((val,i) => {
            if(this.state.selectedEdit === val.id){
                return <tr>
                            <td>{i+1}</td>
                            <td> <input type = 'text' defaultValue={val.category} className='form-control'  ref='categoryEdit' style={{fontSize:'18px', marginTop:'-2px'}}/>  </td>
                            <td><input type = 'button' className='btn btn-info'  value='save' onClick={this.onBtnSaveClick} style={{fontSize:'18px', marginTop:'-2px'}}/></td>
                            <td> <input type = 'button' className='btn btn-danger' value='cancel' onClick={()=>this.setState({selectedEdit:null})} style={{fontSize:'18px', marginTop:'-2px'}}/> </td>        
                        </tr>
            }else{
                return(
                    <tr>
                        <td>{i+1}</td>
                        <td> {val.category} </td>
                        <td> <input type = 'button' className='btn btn-info'  value='edit' onClick={()=>{this.setState({selectedEdit : val.id , dataEdit : val})}} style={{fontSize:'18px', marginTop:'-2px'}}/> </td>
                        <td> <input type = 'button' className='btn btn-danger' value='delete' onClick={()=>this.onBtnDeleteClick(val)} style={{fontSize:'18px', marginTop:'-2px'}}/> </td>        
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
                <div className="top-2">Manage Category</div>
                <div className="top-3"></div>
            </div>
            <div className="mid">
                <div className="mid-1"></div>
                <div className="mid-2" style={{fontFamily:' Arial, Helvetica, sans-serif', overflowY : 'auto'}}>
                    <div className="container" style={{fontFamily:' Arial, Helvetica, sans-serif',fontSize:'15px'}}>
                        <table className="mt-5 mb-5 table">
                            <tr>
                                <td>NO</td>
                                <td>CATEGORY</td>
                                <td>EDIT</td>
                                <td>DELETE</td>
                            </tr>
                            {this.renderJsx()}
                        </table>
                        <div class="row" style={{marginTop:'25vh'}}>
                            <div className="col-md-4">
                                <input type="text" placeholder="Add Category" ref="addCategory" className="form-control"/>
                            </div>
                            <div className="col-md-4">
                                <button className="btn btn-primary" onClick={this.onBtnAddCategoryClick}>
                                    Add Category
                                </button>
                            </div>
                        </div>
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

export default ManageCategory