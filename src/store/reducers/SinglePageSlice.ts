import {createSlice} from "@reduxjs/toolkit";
import {GetSinglePage} from "../../Services/getSinglePage";

type SinglePageState = {
    "slug": string,
    "title": string,
    "description": string,
    "body": string,
    "tagList": string[],
    "createdAt": string,
    "updatedAt": string,
    "favorited": boolean,
    "favoritesCount": number,
    "author": {
        "username": string,
        "bio": string,
        "image": string,
        "following": boolean
    }
}

const initialState:SinglePageState = {
    slug:'',
    title:'',
    description:'',
    body:'',
    tagList:[],
    createdAt:'',
    updatedAt:'',
    favorited:false,
    favoritesCount:0,
    author:{
        username:'',
        bio:'',
        image:'',
        following:false,
    }
}
export const SinglePageSlice = createSlice({
    name:'SinglePageSlice',
    initialState,
    reducers:{

    },
    extraReducers:{
        [GetSinglePage.fulfilled.type]:(state,action)=>{
            state.slug = action.payload.slug
            state.title = action.payload.title
            state.description = action.payload.description
            state.body = action.payload.body
            state.tagList = action.payload.tagList
            state.createdAt = action.payload.createdAt
            state.updatedAt = action.payload.updatedAt
            state.favorited = action.payload.favorited
            state.favoritesCount = action.payload.favoritesCount
            state.author = action.payload.author
        }
    }
})

export default SinglePageSlice.reducer