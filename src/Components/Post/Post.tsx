import React from 'react';
import styles from './Post.module.css'
import {IPost} from "../../Models/IPost";
import { nanoid } from 'nanoid'
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {LikePost} from "../../Services/likePost";
import {Dislike} from "../../Services/Dislike";

type PostProps = {
    params:IPost
}
const Post:React.FC<PostProps> = (props) => {
    const {params} = props
    const tags = params.tagList.map(el=>{
        return <div key={nanoid()} className={styles.tag}>{el}</div>
    })
    const dispatch = useAppDispatch()
    const createData = String(new Date(params.createdAt.slice(0,10))).split(' ')
    const {isAuth,token} = useAppSelector(state => state.UserReducer)
    return (
        <div className={styles.post}>
            <div className={styles.postHeader}>
                <div className={styles.headerInfo}>

                    <div className={styles.mainInfo}>

                        <div className={styles.infoTitle}>

                            <Link className={styles.titleLink} to={`/${params.slug}`}>{params.title}</Link>
                        </div>

                        <div className={styles.likes}>
                            <button disabled={!isAuth} className={`${styles.buttonLike} ${params.favorited ? styles.liked :null}`} onClick={()=>{
                                if(!params.favorited){
                                    dispatch(LikePost({slug:params.slug,token:token}))
                                } else {
                                    dispatch(Dislike({slug:params.slug,token:token}))
                                }
                            }}>
                                ❤
                            </button>
                            <span>{params.favoritesCount}</span>
                        </div>
                    </div>

                    <div className={styles.infoTags}>

                        {tags}

                    </div>

                </div>

                <div className={styles.headerCreator}>
                    <div className={styles.creatorInfo}>
                        <span className={styles.creatorName}>{params.author.username}</span>
                        <span className={styles.postDate}>{`${createData[1]} ${createData[2]}, ${createData[3]}`}</span>
                    </div>
                    <div>
                        <img className={styles.creatorIgm} src={`${params.author.image}`} alt=""/>
                    </div>
                </div>
            </div>
            <div className={styles.postText}>{params.description}</div>
        </div>
    );
};

export default Post;