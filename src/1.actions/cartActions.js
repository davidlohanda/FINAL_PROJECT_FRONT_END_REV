import axios from "axios";


//Cart Count
////menghitung jumlah item dalam cart dengan menghitung panjang array pada table_cart

export const cartCount = (username) => {
    return (dispatch) => {
        axios.get(`http://localhost:2000/bidder/getCart/${username}`)
        .then((res) => {
            dispatch({
                type : 'CART_COUNT',
                payload : res.data.length
            })
        })
        .catch((err) => console.log(err))
    }
}


//Reset Count
// Setelah checkout maka state cart akan kosong kembali
export const resetCount = () => {
    return{
        type : 'RESET_COUNT'
    }
}

