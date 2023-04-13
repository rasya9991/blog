import {createSlice} from "@reduxjs/toolkit";
import {IPost} from "../../Models/IPost";
import {fetchPosts} from "../../Services/fetchPosts";
import {LikePost} from "../../Services/likePost";
import {Dislike} from "../../Services/Dislike";
import {createArticle} from "../../Services/createArticle";

type PostsState = {
    posts:IPost[]
    isLoading:boolean
    error:string
}

const initialState:PostsState = {
    posts:[],
    isLoading:false,
    error:''
}

export const PostsSlice = createSlice({
    name:'PostsSlice',
    initialState,
    reducers:{

    },
    extraReducers:{
        [fetchPosts.fulfilled.type]:(state,action)=>{
            state.isLoading = false
            state.posts = action.payload.articles
        },
        [fetchPosts.pending.type]:(state)=>{
            state.isLoading = true
        },
        [LikePost.fulfilled.type]:(state,action)=>{
            const likedPost = state.posts.findIndex(el=>el.slug === action.payload.slug)
            state.posts.splice(likedPost,1,action.payload)
        },
        [Dislike.fulfilled.type]:(state,action)=>{
            const likedPost = state.posts.findIndex(el=>el.slug === action.payload.slug)
            state.posts.splice(likedPost,1,action.payload)
        },
    }
})

export default PostsSlice.reducer