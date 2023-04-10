import React from 'react';
import styles from './Header.module.css'
import {Link} from 'react-router-dom'
import {useAppSelector} from "../../hooks/redux";
import DosentAuthHeader from "../dosentAuthHeader/DosentAuthHeader";
import AuthHeader from "../AuthHeader/AuthHeader";
const Header = () => {
    const {isAuth,username,avatarka} = useAppSelector(state => state.UserReducer)
    return (
        <div className={styles.header}>
            <div className={styles.headerLogo}>
                <Link to="/" className={styles.headerLogoLink}>Realworld Blog</Link>
            </div>

            {isAuth?<AuthHeader username={username} image={avatarka}/>:<DosentAuthHeader/>}
        </div>
    );
};

export default Header;