import React, {useEffect} from 'react';
import styles from './EditUser.module.css'
import {SubmitHandler, useForm} from "react-hook-form";
import {IEditUserForm} from "../../Models/IEditUserForm";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useNavigate} from "react-router-dom";
import {EditUserAPI} from "../../Services/editUser";

const EditUser = () => {
    const { register, handleSubmit, formState: { errors,isValid},reset} = useForm<IEditUserForm>({mode:'onChange'});
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {isAuth,username,email,token} = useAppSelector(state => state.UserReducer)
    useEffect(()=>{
        if(!isAuth){
            navigate('/')
        }
    },[isAuth])
    const onSubmit:SubmitHandler<IEditUserForm> = (data) => {
        console.log(data)
        const obj = {
            email:data.email,
            newPassword:data.newPassword,
            username:data.username,
            avatar:data.avatar,
            token:token,
        }
        dispatch(EditUserAPI(obj))
        reset()
    }
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Edit user</h2>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

                <div className={styles.field}>
                    <label className={`${styles.inputLabel}`}>
                        Email address
                        <input className={`${errors?.username? styles.errorEmail:null}`} type="text" {...register('username',{
                            required:'Поле обязательно к заполнению!',
                            minLength:{
                                value:6,
                                message:'минимальная длинна 6 символов'
                            }
                        })} placeholder={`${username}`}/>
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
                        })} placeholder={`${email}`}/>
                    </label>
                    <div className={styles.inputError}>
                        {errors?.email && <span>{errors?.email?.message}</span>}
                    </div>
                </div>

                <div className={styles.field}>
                    <label className={`${styles.inputLabel}`}>
                        New Password
                        <input className={`${errors?.newPassword? styles.errorEmail:null}`} type="text" {...register('newPassword',{
                            required:'Поле обязательно к заполнению!',
                            minLength:{
                                value:6,
                                message:'минимальная длинна 6 символов'
                            }
                        })} placeholder={`new password`}/>
                    </label>
                    <div className={styles.inputError}>
                        {errors?.newPassword && <span>{errors?.newPassword?.message}</span>}
                    </div>
                </div>

                <div className={styles.field}>
                    <label className={`${styles.inputLabel}`}>
                        avatar img(url)
                        <input className={`${errors?.avatar? styles.errorEmail:null}`} type="text" {...register('avatar',{})} placeholder={`url`}/>
                    </label>
                    <div className={styles.inputError}>
                        {errors?.avatar && <span>{errors?.avatar?.message}</span>}
                    </div>
                </div>

                <input type="submit" value={'Edit'} className={styles.submitButton} disabled={!isValid}/>
            </form>
        </div>
    );
};

export default EditUser;