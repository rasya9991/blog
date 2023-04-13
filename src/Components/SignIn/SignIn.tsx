import React, {useEffect} from 'react';
import styles from './SignIn.module.css'
import {SubmitHandler, useForm} from "react-hook-form";
import {ISignInForm} from "../../Models/ISignInForm";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {signInFunc} from "../../Services/signIn";
import {useNavigate} from "react-router-dom";


const SignIn = () => {
    const { register, handleSubmit, formState: { errors,isValid},reset} = useForm<ISignInForm>({mode:'onChange'});
    const dispatch = useAppDispatch()
    const {isAuth} = useAppSelector(state => state.UserReducer)
    const navigate = useNavigate()
    useEffect(()=>{
        if(isAuth){
            navigate('/')
        }
    },[isAuth])
    const onSubmit:SubmitHandler<ISignInForm> = async (data) => {
        const signInObj = {...data}
        await dispatch(signInFunc(signInObj))
        reset()
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Sign in</h2>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.field}>
                    <label className={`${styles.inputLabel}`}>
                        Email address
                        <input className={`${errors?.email? styles.errorEmail:null}`} type="text" {...register('email',{
                            required:'Поле обязательно к заполнению!',
                            pattern:{
                                value: /^\S+@\S+\.\S+$/,
                                message: 'Введите валидный email!'
                            }
                        })} placeholder={'email@gmail.com'}/>
                    </label>
                    <div className={styles.inputError}>
                        {errors?.email && <span>{errors?.email?.message}</span>}
                    </div>
                </div>

                <div className={styles.field}>
                    <label className={styles.inputLabel}>
                        Password
                        <input className={`${errors?.password? styles.errorPassword:null}`} type="password" {...register('password',{
                            required:'Поле обязательно к заполнению!'
                        })} placeholder={'password'}/>
                    </label>
                    <div className={styles.inputError}>
                        {errors?.password && <span>{errors?.password?.message}</span>}
                    </div>
                </div>

                <input type="submit" value={'sign in'} className={styles.submitButton} disabled={!isValid}/>
            </form>
        </div>
    );
};

export default SignIn;