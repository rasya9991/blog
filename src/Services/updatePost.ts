import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {ILike} from "../Models/ILike";

type propObj = {
    slug:string
    title:string
    description:string
    tagList:string[]
    body:string
    token:string
}
export const updatePost = createAsyncThunk(
    'post/update',
    async (obj:propObj,thunkAPI)=>{
        const resObj = {
            title:obj.title,
            description:obj.description,
            body:obj.body,
            tagList:obj.tagList
        }
        console.log(resObj)
        try {
            const res = await axios.put<ILike>(`https://blog.kata.academy/api/articles/${obj.slug}`,{article:{...resObj}},{headers:{Authorization: `Bearer ${obj.token}`}}).then(r=>r.data)
            console.log(res)
            return res.article
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)