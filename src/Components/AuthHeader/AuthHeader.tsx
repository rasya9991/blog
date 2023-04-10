import React, {FC} from 'react';
import styles from "./AuthHeader.module.css";
import {Link} from "react-router-dom";
import {useAppDispatch} from "../../hooks/redux";
import {logOut} from "../../store/reducers/UserSlice";

type IHeaderProps = {
    username:string
    image:string
}
const AuthHeader:FC<IHeaderProps> = (props) => {
    const {username,image} = props
    const dispatch = useAppDispatch()
    return (
        <div className={styles.headerAuthorization}>
            <div className={styles.createArticleBtn}>
                <Link to="/create-article" className={styles.createArticle}>Create article</Link>
            </div>
            <div className={styles.userInfo}>
                <Link to={'edit-user'} className={styles.usernameLink}>{username}</Link>
                <div className={styles.userAvatar}>
                    <img src={`${image !== '' ? image : null}`} alt="" className={styles.avatar}/>
                </div>
            </div>
            <div className={styles.logOutBtn}>
                <Link to="/" className={styles.logOut} onClick={()=>{dispatch(logOut())}}>Log Out</Link>
            </div>
        </div>
    );
};

export default AuthHeader;