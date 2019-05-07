import axios from "axios";



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

export const resetCount = () => {
    return{
        type : 'RESET_COUNT'
    }
}

