import axios from 'axios'


// =====================LOGIN=============================
//Ketika login maka action creator onLogin akan melakukan :
//1. Mengubah action.type menjadi 'LOADING' yang bertugas mengubah nilai state loading dari false menjadi true
//2. Mengubah action.type menjadi 'LOGIN_SUCCESS' jika data user ditemukan dan user sudah terverifikasi kemudian akan mengirim respon
//   berupa data user untuk mengubah global state (username , role) untuk disesuaikan apakah user login sebagai admin / user
//   jika data user tidak ditemukan maka action.type berubah menjadi 'USER_NOT_FOUND' yang bertugas merubah state error untuk memberitahu
//   bahwa user tidak ada, jika data user sudah ada namun user belum melakukan verifikasi maka action.type berubah menjadi 'USER_NOT_VERIFIED'
//   yang bertugas mengirim error yang memberitahu bahwa user harus melakukan verifikasi akun dahulu sebelum bisa login
//3. Ketika sistem / koneksi bermasalah maka action.type menjadi 'SYSTEM_ERROR_LOGIN' yang akan mengirim error message untuk memberitahu
//   bahwa sistem / koneksi bermasalah silakan coba nanti

export const onLogin=(username,password)=>{
    return(dispatch)=>{
        dispatch({
            type:'LOADING'
        })
        axios.get('http://localhost:2000/login/userLogin',{params:{username,password}})
        .then((res)=>{
            //Cek apakah user sudah terdaftar
            if(res.data.length === 0){
                dispatch({
                    type:'USER_NOT_FOUND'
                })
            }else if(res.data[0].verified==='true'){
                dispatch({
                    type:'LOGIN_SUCCESS',
                    payload: res.data[0]
                })
            }else if(res.data[0].verified==='false'){
                dispatch({
                    type:'USER_NOT_VERIFIED'
                })
            }
        })
        //Jika sistem / koneksi bermasalah
        .catch((err)=>{
            dispatch({
                type:'SYSTEM_ERROR_LOGIN'
            })
        })
    }
}


//Keep Login
//Berfungsi agar saat dilakukan reload data user kembali di kirim ke global state dengan bantuan cookie dengan merubah action.type menjadi 'LOGIN_SUCCESS'

export const keepLogin=(cookie)=>{
    return(dispatch)=>{
        axios.get('http://localhost:2000/login/userKeepLogin',{params:{username : cookie}})
        .then((res)=>{
            if(res.data.length > 0){
                dispatch({
                    type:'LOGIN_SUCCESS',
                    payload: res.data[0]
                })
            }
        })
        .catch((err)=>console.log(err))
    }
    
}

//Reset User
//Berfungsi merubah action.type menjadi 'RESET_USER' yang akan membuat state pada reducer userGlobal kembali ke INITIAL_STATE
export const resetUser=()=>{
    return{
        type:'RESET_USER'
    }
}

// ========================REGISTER==========================
//Ketika register maka action creator onRegister akan melakukan :
//1. Mengubah action.type menjadi 'LOADING' yang bertugas mengubah nilai state loading dari false menjadi true
//2. Menerima username,email,password dari ref/inputan user, kemudian akan akan di cek terlebih dahulu apakah username sudah ada atau belum,
//   jika belum ada maka action.type berubah menjadi 'REGISTER_SUCCESS' yang bertugas mengirim payload berupa data user yang baru yang nanti digunakan
//   untuk mengirim success message bahwa user telah berhasil melakukan registrasi dan akan diminta melakukan verifikasi email, jika username yang diinput
//   sudah ada maka action.type berubah menjadi 'USERNAME_NOT_AVAILABLE' yang bertugas merubah error message bahwa username telah digunakan
//3. Jika sistem / koneksi bermasalah maka action.type berubah menjadi 'SYSTEM_ERROR_REGISTER' yang bertugas merubah error message bahwa sistem / koneksi sedang mengalami
//   gangguan, sehingga diminta untuk coba kembali nanti

export const onRegister=(username,email,password)=>{
    return(dispatch)=>{
        dispatch({
            type:'LOADING'
        })

        axios.post('http://localhost:2000/auth/userRegister',{username,email,password, role : 'user'})
        .then((res)=>{
            //Pada backend terlebih dahulu dilakukan query select pada table_user untuk mengecek apakah data user sudah ada apa belum
            // Ketika res.datanya tidak ada maka pada backend akan dilakukan query insert pada table_user dan mengirim respon 'Registration Success'
            if(res.data ==='Registration Success'){
                dispatch({
                    type:'REGISTER_SUCCESS',
                    payload: res.data
                })
            // Ketika res.data nya ada maka backend akan mengirim respon 'Username not available'
            }else if(res.data ==='Username not available'){
                dispatch({
                    type:'USERNAME_NOT_AVAILABLE'
                })
            }
        })
        //Jika sistem /koneksi bermasalah
        .catch((err)=>{
            dispatch({
                type:'SYSTEM_ERROR_REGISTER'
            })
        })
    }
}


//====================================================================================================================
//Cookie Checked
// Berfungsi untuk memastikan bahwa payload yang dikirim telah ditangkap di global state

export const cookieChecked = () => {
    return {
        type : 'COOKIE_CHECKED'
    }
}