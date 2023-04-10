import {createAsyncThunk} from "@reduxjs/toolkit";
import {ISignInForm} from "../Models/ISignInForm";
import axios from "axios";

type IAuth = {
    "user": {
        "email": "string",
        "token": "string",
        "username": "string",
        "bio": "string",
        "image": "string"
    }
}
export const signInFunc = createAsyncThunk(
    'user/signIn',
    async (obj:ISignInForm,thunkAPI) => {
        try {
            const auth = await axios.post<IAuth>('https://blog.kata.academy/api/users/login',{user:{...obj}}).then(r=>r.data)
            console.log(auth)

            return auth.user
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)