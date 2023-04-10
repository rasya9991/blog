import {createAsyncThunk} from "@reduxjs/toolkit";
import {ISignUpForm} from "../Models/ISignUpForm";
import axios from "axios";

type Register = {
    user:{
        username:string
        email:string
        password:string
    }
}
type response = {
    username:string
    email:string
    password:string
}

type IAuth = {
    "user": {
        "email": "string",
        "token": "string",
        "username": "string",
        "bio": "string",
        "image": "string"
    }
}
export const signUpFunc = createAsyncThunk(
    'user/signup',
    async (obj:ISignUpForm,thunkAPI)=>{
        const finalObj:response = {
            username:obj.username,
            email:obj.email,
            password:obj.password
        }

        try {
            await axios.post<Register>('https://blog.kata.academy/api/users',{user:{...finalObj}}).then(r=>r.data)

            const regObj = {
                email:obj.email,
                password:obj.password
            }
            console.log(regObj)
            const auth = await axios.post<IAuth>('https://blog.kata.academy/api/users/login',{user:{...regObj}}).then(r=>r.data)
            console.log(auth.user)
            return auth.user
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)