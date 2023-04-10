import {createAsyncThunk} from "@reduxjs/toolkit";
import {ISinglePage} from "../Models/ISinglePage";
import axios from "axios";

type ObjProp ={
    slug:string,
    token:string,
    isAuth:boolean,
}
export const GetSinglePage = createAsyncThunk(
    'post/singlePage',
    async (obj:ObjProp,thunkAPI)=>{
        try {
            if(obj.isAuth) {
                const response = await axios.get<ISinglePage>(`https://blog.kata.academy/api/articles/${obj.slug}`,{headers:{Authorization: `Bearer ${obj.token}`}}).then(r=>r.data)
                return response.article
            } else {
                const response = await axios.get<ISinglePage>(`https://blog.kata.academy/api/articles/${obj.slug}`).then(r=>r.data)
                return response.article
            }
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)