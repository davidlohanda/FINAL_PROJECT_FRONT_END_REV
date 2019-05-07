import {combineReducers} from 'redux'
import userGlobal from './userGlobal'
import cartCount from './cartCount'

export default combineReducers({
    user : userGlobal,
    cart : cartCount
})
