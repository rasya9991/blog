import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {ILike} from "../Models/ILike";

type objProp = {
    token:string
    slug:string
}
export const Dislike = createAsyncThunk(
    'post/dislike',
    async (obj:objProp,thunkAPI)=>{
        try {

            const response = await axios.delete<ILike>(`https://blog.kata.academy/api/articles/${obj.slug}/favorite`,{headers:{Authorization: `Bearer ${obj.token}`}}).then(r=>r.data)

            return response.article
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)