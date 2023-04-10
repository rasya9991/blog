import React from 'react';
import styles from "./dosentAuthHeader.module.css";
import {Link} from "react-router-dom";

const DosentAuthHeader = () => {
    return (
        <div className={styles.headerAuthorization}>
            <Link to="/sign-in" className={styles.signIn}>Sign in</Link>
            <div className={styles.signUpBtn}>
                <Link to="/sign-up" className={styles.signUp}>Sign up</Link>
            </div>
        </div>
    );
};

export default DosentAuthHeader;