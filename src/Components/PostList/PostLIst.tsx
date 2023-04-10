import React, {useEffect, useState} from 'react';
import styles from './PostList.module.css'
import Post from "../Post/Post";
import {fetchPosts} from "../../Services/fetchPosts";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import { Pagination } from 'antd';
import { nanoid } from 'nanoid'


const PostLIst = () => {
    const dispatch = useAppDispatch()
    const [howMuchToShow,setHowMuchToShow] = useState(5)
    const {posts} = useAppSelector(state => state.PostReducer)
    const {token} = useAppSelector(state => state.UserReducer)
    useEffect(()=>{
        dispatch(fetchPosts(token))
    },[])
    const elements = posts.slice(howMuchToShow-5,howMuchToShow).map((el)=>{
        return <Post  key={nanoid()} params={{...el}}/>
    })
    return (
        <>
            <div className={styles.postList}>
                {elements}
                <Pagination defaultCurrent={1} total={258} defaultPageSize={5} showSizeChanger={false} onChange={(page)=>setHowMuchToShow(page*5)}/>
            </div>
        </>
    );
};

export default PostLIst;