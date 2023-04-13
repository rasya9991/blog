import {createAsyncThunk} from "@reduxjs/toolkit";
import {ICreateArticleForm} from "../Models/ICreateArticleForm";
import axios from "axios";

type resObjType = {
    "title": string,
    "description": string,
    "body": string,
    "tagList": string[]
}
export const createArticle = createAsyncThunk(
    'user/create-article',
    async (obj:ICreateArticleForm,thunkAPI) => {
        try {
            const resObj:resObjType = {
                title:obj.title,
                description:obj.description,
                body:obj.body,
                tagList: obj.tagList
            }
            console.log(resObj)
            const res = await axios.post('https://blog.kata.academy/api/articles',{article:{...resObj}},{headers:{Authorization: `Bearer ${obj.token}`}}).then(r=>r.data)
            console.log(res ,' 3213131')
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)