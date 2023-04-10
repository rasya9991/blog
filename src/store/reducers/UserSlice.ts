import {createSlice} from "@reduxjs/toolkit";
import {signInFunc} from "../../Services/signIn";
import {signUpFunc} from "../../Services/signUpFunc";
import {createArticle} from "../../Services/createArticle";
import {EditUserAPI} from "../../Services/editUser";


type IState = {
    isAuth:boolean
    rejected:boolean
    email:string
    token:string
    username:string
    avatarka:string
}

const initialState:IState = localStorage.getItem('userInfo') !== null ? JSON.parse(localStorage.getItem('userInfo') || '') : {
    isAuth:false,
    rejected:false,
    email:'',
    token:'',
    username:'',
    avatarka:'',
}
if(initialState.email === ''){
    localStorage.setItem('userInfo',JSON.stringify(initialState))
}
export const UserSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        logOut(state):void{
            state.isAuth = false
            state.email = ''
            state.username = ''
            state.token = ''
            state.avatarka = ''
            localStorage.setItem('userInfo',JSON.stringify(state))
        },
    },
    extraReducers:{
        [signInFunc.fulfilled.type]:(state,action)=>{
            state.isAuth = true
            state.email = action.payload.email
            state.username = action.payload.username
            state.token = action.payload.token
            state.avatarka = String(action.payload.image)

            localStorage.setItem('userInfo',JSON.stringify(state))
        },
        [signInFunc.rejected.type]:(state)=>{
            state.rejected = true
        },
        [signUpFunc.fulfilled.type]:(state,action)=>{
            state.isAuth = true
            state.email = action.payload.email
            state.username = action.payload.username
            state.token = action.payload.token
            state.avatarka = String(action.payload.image)

            localStorage.setItem('userInfo',JSON.stringify(state))
        },
        [signUpFunc.rejected.type]:(state)=>{
            state.rejected = true
        },
        [createArticle.fulfilled.type]:()=>{
            console.log('teeest')
        },
        [EditUserAPI.fulfilled.type]:(state,action) =>{
            state.avatarka = String(action.payload.image)
            state.token = action.payload.token
            state.username = action.payload.username
            state.email = action.payload.email

            localStorage.setItem('userInfo',JSON.stringify(state))
        },
    }
})
export const {logOut} = UserSlice.actions

export default UserSlice.reducer