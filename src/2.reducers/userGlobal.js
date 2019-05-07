const INITIAL_STATE = {id: 0 ,username : '', password : '', error : '', loading : false, success : '', cookie : false}

export default (state=INITIAL_STATE, action)=>{
    if(action.type==='LOADING'){
        return {...INITIAL_STATE, loading : true , cookie : true} 
    }else if(action.type==='LOGIN_SUCCESS'){
        return {...INITIAL_STATE, username : action.payload.username , role:action.payload.role , cookie : true}
    }else if(action.type==='USER_NOT_FOUND'){
        return {...INITIAL_STATE, error:'Incorrect username or password', cookie : true}
    }else if(action.type==='USER_NOT_VERIFIED'){
        return {...INITIAL_STATE, error : 'Please verify your account first, check your email' , cookie : true}
    }else if(action.type==='SYSTEM_ERROR'){
        return {...INITIAL_STATE, error:'System error, please try again later', cookie : true}
    }else if(action.type==='RESET_USER'){
        return {...INITIAL_STATE, cookie: true}
    }else if(action.type==='USERNAME_NOT_AVAILABLE'){
        return {...INITIAL_STATE, cookie : true, error:'Username already exist'}
    }else if(action.type==='REGISTER_SUCCESS'){
        return {...INITIAL_STATE, success : action.payload, cookie : true}
    }else if(action.type==='COOKIE_CHECKED'){
        return {...state, cookie : true}
    }else{
        return state
    }
}



// const INITIAL_STATE={id:0,username:'',role:'',loading:false,error:''}

// export default(state=INITIAL_STATE,action)=>{
//     if(action.type==='LOADING'){
//         return{...INITIAL_STATE,loading:true}
//     }else if(action.type==='LOGIN_SUCCESS'){
//         return{...INITIAL_STATE,username:action.payload.username,role:action.payload.role,id:action.payload.id}
//     }else if(action.type==='USER_NOT_FOUND'){
//         return{...INITIAL_STATE,error:'Incorrect username or password'}
//     }else if(action.type==='SYSTEM_ERROR'){
//         return{...INITIAL_STATE,error:'System error'}
//     }else if(action.type==='RESET_USER'){
//         return INITIAL_STATE
//     }else if(action.type==='USERNAME_NOT_AVAILABLE'){
//         return{...INITIAL_STATE,error:'Username not available'}
//     }else{
//         return state
//     }
// }