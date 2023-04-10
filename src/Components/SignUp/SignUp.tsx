import React, {useEffect} from 'react';
import styles from './SignUp.module.css'
import {SubmitHandler, useForm} from "react-hook-form";
import {ISignUpForm} from "../../Models/ISignUpForm";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {signUpFunc} from "../../Services/signUpFunc";
import {useNavigate} from "react-router-dom";
const SignUp = () => {
    const { register, handleSubmit, formState: { errors,isValid},reset,watch} = useForm<ISignUpForm>({mode:'onChange'});
    const {isAuth} = useAppSelector(state => state.UserReducer)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const onSubmit:SubmitHandler<ISignUpForm> = (data) => {
        dispatch(signUpFunc(data))
        reset()
    }
    const passwordNow = watch('password')
    const passwordRepeat = watch('repeatPassword')
    useEffect(()=>{
        if(isAuth){
            navigate('/')
        }
    },[isAuth])
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Sign Up</h2>

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

                <div className={styles.field}>
                    <label className={`${styles.inputLabel}`}>
                        Username
                        <input type="text" {...register('username',{
                            required:'Поле обязательно к заполнению!',
                        })} placeholder={'johcn2114'}/>
                    </label>
                    <div className={styles.inputError}>
                        {errors?.username && <span>{errors?.username?.message}</span>}
                    </div>
                </div>

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
                            required:'Поле обязательно к заполнению!',
                            minLength:{
                                value:6,
                                message:'Минимальная длинна 6 символов'
                            },
                            validate:(e)=>{
                                if(passwordRepeat && passwordRepeat !== e ){
                                    return 'Пароли не совпадают'
                                }
                            }

                        })} placeholder={'password'}/>
                    </label>
                    <div className={styles.inputError}>
                        {errors?.password && <span>{errors?.password?.message}</span>}
                    </div>
                </div>

                <div className={styles.field}>
                    <label className={styles.inputLabel}>
                        repeat Password
                        <input className={`${errors?.repeatPassword? styles.errorPassword:null}`} type="password" {...register('repeatPassword',{
                            required:'Поле обязательно к заполнению!',
                            validate:(e)=>{
                                if(passwordNow !== e ){
                                    return 'Пароли не совпадают'
                                }
                            }
                        })} placeholder={'password'}/>
                    </label>
                    <div className={styles.inputError}>
                        {errors?.repeatPassword && <span>{errors?.repeatPassword?.message}</span>}
                    </div>
                </div>
                <label className={styles.checkBoxAgree}>
                    <input type="checkbox" {...register('isAgree',{
                        required:true
                    })}/>
                    I agree to the processing of my personal information
                </label>

                <input type="submit" className={styles.submitButton} value={'Login'} disabled={!isValid}/>
            </form>
        </div>
    );
};

export default SignUp;