import React, {useEffect} from 'react';
import styles from './SinglePage.module.css'
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {Link,useParams} from "react-router-dom";
import {GetSinglePage} from "../../Services/getSinglePage";
import {nanoid} from "nanoid";
import {LikePost} from "../../Services/likePost";
import {Dislike} from "../../Services/Dislike";
const SinglePage = () => {
    const dispatch = useAppDispatch()
    const {isAuth,token} = useAppSelector(state => state.UserReducer)
    const {slug,title,description,body,tagList,createdAt,favorited,favoritesCount,author} = useAppSelector(state => state.SinglePageReducer)
    const params = useParams()
    useEffect(()=>{
        if(params.id !== undefined){
            dispatch(GetSinglePage({slug:params.id,token:token,isAuth:isAuth}))
        }
    },[])
    const tags = tagList.map(el=>{
        return <div key={nanoid()} className={styles.tag}>{el}</div>
    })
    const createData = String(new Date(createdAt.slice(0,10))).split(' ')
    return (
        <div className={styles.post}>
            <div className={styles.postHeader}>
                <div className={styles.headerInfo}>

                    <div className={styles.mainInfo}>

                        <div className={styles.infoTitle}>

                            <Link className={styles.titleLink} to={`/${slug}`}>{title}</Link>
                        </div>

                        <div className={styles.likes}>
                            <button className={`${styles.buttonLike} ${favorited ? styles.liked : null}`} onClick={()=>{
                                if(!favorited){
                                    dispatch(LikePost({slug:slug,token:token}))
                                } else {
                                    dispatch(Dislike({slug:slug,token:token}))
                                }
                            }}>
                                ❤
                            </button>
                            <span>{favoritesCount}</span>
                        </div>
                    </div>

                    <div className={styles.infoTags}>

                        {tags}

                    </div>

                </div>
                <div className={styles.headerCreator}>
                    <div className={styles.creatorInfo}>
                        <span className={styles.creatorName}>{author.username}</span>
                        <span className={styles.postDate}>{`${createData[1]} ${createData[2]}, ${createData[3]}`}</span>
                    </div>
                    <div>
                        <img className={styles.creatorIgm} src={`${author.image}`} alt=""/>
                    </div>
                </div>
            </div>
            <div className={styles.postText}>{description}</div>
            <div className={styles.body}>{body}</div>
        </div>
    );
};

export default SinglePage;