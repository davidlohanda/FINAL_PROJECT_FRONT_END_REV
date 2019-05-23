import React from 'react'
import axios from 'axios'
import CountDown from 'react-countdown-now'
import {connect} from 'react-redux'
import {cartCount} from '../1.actions'
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import QueryString from 'query-string'
import {withRouter} from 'react-router-dom'

import '../support/css/Shopstyle.css'

class Shop extends React.Component{
    state = {sellAuction : [] , timer : [] , winner : [], modal : false, selected:0, duration:0, search:''}

    componentDidMount(){
        this.getAllAuction()
        this.getWinner()
        this.getDataUrl()
    }

    // Get data pemenang
    getWinner = () => {
        axios.get(`http://localhost:2000/bidder/winner`)
        .then((res) => {
            console.log(res.data)
            this.setState({winner : res.data})
        })
        .catch((err) => console.log(err))
    }

    // Get data barang lelang
    getAllAuction = () => {
        axios.get('http://localhost:2000/auction/getAllCreateAuction')
        .then((res) => {
            console.log(res.data)
            this.setState({sellAuction : res.data})
        })
        .catch((err) => console.log(err))
    }


    onBtnBidClick = (val) => {
        // get user yang melakukan bidding untuk memperoleh id user tersebut yang nantinya akan digunakan untuk mencari pemenang lelang
        axios.get(`http://localhost:2000/login/getUserByUsername?username=${this.props.username}`)
        .then((res) => {
            //dilakukan update harga sesuai id produk yang dipilih
            //val merupakan data yang dikirim saat bid button di klik yang berisi data dari produk (id produk, harga produk, dll)
            axios.put(`http://localhost:2000/bidder/makeABid/${val.id}`, {
                new_product_price : val.product_price + val.add_price,
                product_id : val.id,
                user_id :res.data[0].id
            })
            .then((res1)=>{
                //Setelah berhasil update harga maka akan muncul alert yang berasal dari respon pada backend bahwa anda telah berhasil mengajukan bidding
                alert(res1.data)
                this.getWinner()
                this.getAllAuction() // sehingga harga baru dan pemenangnya bisa ditampilkan 
            })
            .catch((err) => console.log(err))
        })
        .catch((err) => console.log(err))
    }

    updateAndDelete = (val) => {
        //Setelah waktu lelang berakhir maka fungsi ini akan dijalankan
        alert('masuk')
        //Akan di get data pemenang berdasarkan id_product yang ia menangkan
        axios.get(`http://localhost:2000/bidder/winner/${val.id}`)
        .then((res) => {
            //jika ternyata produk tersebut tidak pernah di bid maka produk akan langsung di delete
            if(res.data.length === 0){
                alert('no bidder!')
                axios.delete(`http://localhost:2000/auction/deleteCreateAuction?id=${val.id}&imageBefore=${val.product_image}`)
                .then((res) => {
                    //Setelah berhasil maka akan di get semua data baru setelah delete dilakukan 
                    this.getAllAuction()
                })
                .catch((err) => console.log(err))
            }else{
            //Jika pemenang produk ditemukan maka data seperti(user_id , product_id , dll) akan di masukan ke table_cart
            var dataCart = {
                user_id : res.data[0].user_id,
                product_id : res.data[0].product_id,
                bid_price : res.data[0].bid_price,
                product_name : res.data[0].product_name
            }
            axios.post('http://localhost:2000/bidder/addtocart' , dataCart)
            .then((res) => {
                //Setelah berhasil insert data ke table maka action creator cartCount dipanggil untuk menghitung panjang array cart si user
                this.props.cartCount(this.props.username)
                //Setelah itu dilakukan juga delete produk yang telah berakhir masa lelangnya
                axios.delete(`http://localhost:2000/auction/deleteCreateAuction?id=${val.id}&imageBefore=${val.product_image}`)
                .then((res) => {
                    console.log(res)
                    //Kemudian di get kembali data baru setelah di delete
                    this.getAllAuction()
                })
                .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
            }
        })
        .catch((err) => console.log(err))
    }

    //Ini merupakan fungsi bawaan dari react-count-down-now yang digunakan untuk membuat countdown timer
    renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
          // Render a completed state
            return <span style={{color:'red'}}>auction complete</span>

        } else {
          // Render a countdown
          return <span style={{color:'#487eb0', fontWeight:600}}>{days}d:{hours}h:{minutes}m:{seconds}s</span>;
        }
      };

    renderSellAuction = () => {
        var arrFilter = this.state.sellAuction.filter((val) => {
            return val.product_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        })
        var jsx = arrFilter.map((val,i) => {
            
            //endDate merupakan hasil konversi dari duration (berisi tanggal berkahirnya lelang) ke milisecond
            var endDate =  Date.parse(val.duration)
            // Waktu sekarang yang akan berubah-ubah terus
            var now = new Date().getTime()
            //Waktu (dalam milisecond) yang berisi sisa waktu lelang
            var distance = endDate - now
            
            return (
                     <div className="card mt-4 mb-4 col-lg-3 col-md-5 col-12 ml-2" style={{fontSize:'15px', fontFamily:'Arial, Helvetica, sans-serif'}}>
                        <img onClick={()=>this.setState({modal:true, selected:i, duration:distance})} src={'http://localhost:2000/'+val.product_image} className="img-fluid" style={{height:'40vh',cursor:'pointer'}} alt="..." />
                        <div className="card-body">
                            <h5 onClick={()=>this.setState({modal:true, selected:i})}  className="card-title text-center" style={{width:'100%',fontSize:'16px', fontWeight:700, cursor:'pointer'}}>{val.product_name}</h5>
                            <hr/>
                            <p className="card-text">Current Price : Rp.{val.product_price}</p>
                            <p className="card-text">Current Winner :
                            {/* Kalo state winner ada, maka akan dicocokan antara id_product pada table_winner dengan table_create_auction, jika sama, maka akan ditampilkan pememang produknya */}
                            {   this.state.winner.length?
                                this.state.winner.map((w) => {
                                   return  w.product_id===val.id?<p>{w.nama}</p>:null
                                }) : null
                            }
                            </p>
                            <p><CountDown  date={Date.now() + distance} renderer={this.renderer}  onComplete={()=>this.updateAndDelete(val)}/></p>
                        <button style={{backgroundColor:'#000',color:'#fff', fontSize:'15px'}}  className="btn" onClick={()=>this.onBtnBidClick(val)}>Bid for Rp.{val.product_price+val.add_price}</button>
                        </div>
                    </div>
            )
        })
        if(arrFilter.length === 0){
            return <div className="row justify-content-center mt-5">
                <p className="mt-5" style={{textDecoration:'underline',color:'#95989A'}}>No auction for this keyword yet</p>
            </div>
        }else{
            return jsx
        }
    }

    //Untuk push link ke url box
    pushUrl = () => {
        var newLink = `/allcategories`
        var params = []
        if(this.refs.inputSearch.value){
            params.push({
                params : 'product',
                value : this.refs.inputSearch.value
            })
            newLink += '?' + params[0].params + '=' + params[0].value
            console.log(newLink)
            this.props.history.push(newLink)
        }else if(this.refs.inputSearch.value === ''){
            newLink = '/allcategories'
            this.props.history.push(newLink)
        }
        
    }

    getDataUrl = () => {
    if(this.props.location.search){
            var obj = QueryString.parse(this.props.location.search)
            if(obj.product){
                this.setState({search : obj.product})
            }
        } 
    }

    onChangeHandler = () => {
        this.setState({search : this.refs.inputSearch.value})
        this.pushUrl()
    }



    render(){
        if(this.state.sellAuction.length === 0){
            return(
                <div className="mt-5 row justify-content-center">
                    <p className="mt-5" style={{textDecoration:'underline',color:'#95989A'}}>No auction yet</p>
                </div>
            )
        }else{
            return(
                <div  className="container-fluid mb-5" style={{overflow:'hidden'}}>
                    <span className="text-center mt-5" style={{display:'block'}}><i className="fas fa-search mr-2"></i><input value={this.state.search}   ref="inputSearch" onChange={this.onChangeHandler}  style={{width:'40vw',height:'7vh',padding:'10px',outline:'none'}} type="text" placeholder="Search"></input></span>
                    <div className="mt-5 row justify-content-center">
                        {this.renderSellAuction()}

                        {/* =============MODAL================= */}
                        <div>
                            <Modal isOpen={this.state.modal} toggle={()=>{this.setState({modal : false})}} className={this.props.className}>
                            <ModalHeader toggle={()=>{this.setState({modal : false})}}>{this.state.sellAuction[this.state.selected].product_name}</ModalHeader>
                            <ModalBody>
                            <div className="img-fluid">
                                <img src={'http://localhost:2000/' + this.state.sellAuction[this.state.selected].product_image} width='100%' alt='broken' />
                            </div>
                            <div className='row'> 
                                <div className='col-md-12'>
                                    <label className="mt-3" style={{fontWeight:500}}>Current Price :</label>
                                    <p>Rp.{this.state.sellAuction[this.state.selected].product_price}</p>
        
                                    <label className="mt-3" style={{fontWeight:500}}>Product Description :</label>
                                    <p>{this.state.sellAuction[this.state.selected].product_desc}</p>

                                    <label className="mt-3" style={{fontWeight:500}}>Current Winner :</label>
                                    <p>{this.state.winner.length?
                                        this.state.winner.map((w) => {
                                            return w.product_id===this.state.sellAuction[this.state.selected].id?<p>{w.nama}</p>:null
                                        }) : null
                                    }</p>
                                </div>
                                <div className="col-md-12 mt-3">
                                <p><CountDown  date={Date.now() + this.state.duration} renderer={this.renderer} on onComplete={()=>this.updateAndDelete(this.state.sellAuction[this.state.selected])}/></p>
                                <button style={{backgroundColor:'#000',color:'#fff', fontSize:'15px'}} className="btn btn-control" onClick={()=>this.onBtnBidClick(this.state.sellAuction[this.state.selected])}>Bid for Rp.{this.state.sellAuction[this.state.selected].product_price+this.state.sellAuction[this.state.selected].add_price}</button>
                                </div>
                            </div>
                            </ModalBody>
                            </Modal>
                        </div>
                    </div>
                </div>
            )   
        }
    }
}

const mapStateToProps = (state) => {
    return {
        username : state.user.username,
        cart : state.cart.count
    }
}

export default withRouter(connect(mapStateToProps,{cartCount})(Shop))