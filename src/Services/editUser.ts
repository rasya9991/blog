import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

type objProp = {
    email:string
    newPassword:string
    username:string
    avatar:string

    token:string
}

type resType = {
    "user": {
        "email": "string",
        "token": "string",
        "username": "string",
        "bio": "string",
        "image": "string"
    }
}
export const EditUserAPI = createAsyncThunk(
    'user/edit-user',
    async (obj:objProp,thunkAPI)=>{
        try {
            const resObj = {
                email:obj.email,
                password:obj.newPassword,
                username:obj.username,
                bio: '',
                image:obj.avatar,
            }

            const response = await axios.put<resType>('https://blog.kata.academy/api/user',{user:{...resObj}},{headers:{Authorization: `Bearer ${obj.token}`}}).then(r=>r.data)

            return response.user
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)