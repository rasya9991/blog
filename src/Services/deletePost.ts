import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

type objProp = {
    slug:string
    token:string
}
export const DeletePost = createAsyncThunk(
    'post/delete',
    async (obj:objProp,thunkAPI)=>{
        try {
            await axios.delete(`https://blog.kata.academy/api/articles/${obj.slug}`,{headers:{Authorization: `Bearer ${obj.token}`}}).then(r=>r.data)
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)