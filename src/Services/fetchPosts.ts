import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {IPost} from "../Models/IPost";

type fetchApi = {
    articles:IPost[]
    articlesCount:number
}
export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (token:string,thunkAPI)=>{
        try {
            const response = await axios.get<fetchApi>('https://blog.kata.academy/api/articles?limit=1000',{headers:{Authorization: `Bearer ${token}`}})
            return response.data
        } catch (e){
            return thunkAPI.rejectWithValue(e)
        }
    }
)