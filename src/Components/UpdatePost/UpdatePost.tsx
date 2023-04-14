import React, {useEffect} from 'react';
import styles from './UpdatePost.module.css'
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useNavigate} from "react-router-dom";
import {SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {ICreateArticleForm} from "../../Models/ICreateArticleForm";
import {updatePost} from "../../Services/updatePost";
const UpdatePost = () => {
    const {isAuth} = useAppSelector(state => state.UserReducer)
    const {tagList,title,description,body,author,slug} = useAppSelector(state => state.SinglePageReducer)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {register,control, handleSubmit, formState: { errors,isValid},reset,} = useForm<ICreateArticleForm>({mode:"onChange",defaultValues:{
            tagList:[...tagList]
        }})
    const { fields, append,remove, } = useFieldArray({
        name:'tagList',
        control,
    }as any);
    const tagsInputs = fields.map((item, index) => {
        return (
            <li key={item.id} className={styles.tagInput}>
                <input
                    {...register(`tagList.${index}`, { required: true })}
                />
                <button className={styles.deleteButton} type="button" onClick={() => remove(index)}>
                    Delete
                </button>
            </li>
        );
    })
    const {token,username} = useAppSelector(state => state.UserReducer)
    const onSubmit:SubmitHandler<ICreateArticleForm> = (data) => {
        data.token = token
        dispatch(updatePost({title:data.title,body:data.body,description:data.description,token:token,slug:slug,tagList:data.tagList}))
        navigate('/')
        reset()
    }

    useEffect(()=>{
        if(!isAuth || username !== author.username){
            navigate('/')
        }
    },[isAuth])
    return (
        <div className={styles.createArticleContainer}>
            <div className={styles.title}>
                <span>Update article</span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

                <div className={styles.inputField}>
                    <label className={styles.inputLabel}>
                        Title
                        <input type="text" {...register('title',{
                            required:'Поле обязательное для ввода!',
                            minLength:1
                        })} placeholder={title}/>
                    </label>
                    <div className={styles.inputError}>{errors?.title && <span className={styles.error}>{errors?.title?.message}</span>}</div>
                </div>

                <div className={styles.inputField}>
                    <label className={styles.inputLabel}>
                        Description
                        <input type="text" {...register('description',{
                            required:'Поле обязательное для ввода!'
                        })} placeholder={description}/>
                    </label>
                    <div className={styles.inputError}>{errors?.description && <span className={styles.error}>{errors?.description?.message}</span>}</div>
                </div>

                <div className={styles.inputField}>
                    <label className={`${styles.inputLabel}`}>
                        Body
                        <textarea className={styles.textAreaLabel} {...register('body',{
                            required:'Поле обязательное для ввода!'
                        })} placeholder={body}></textarea>
                    </label>
                    <div className={styles.inputError}>{errors?.body && <span className={styles.error}>{errors?.body?.message}</span>}</div>
                </div>
                {tagsInputs}
                <button className={styles.addTagBtn} onClick={()=>append('')}>Add tag</button>
                {fields.length > 0 ? null : <span className={styles.error}>Добавьте минимум 1 тег</span>}
                <input type="submit" className={styles.submitBtn} value={'Update'} disabled={!isValid}/>
            </form>

        </div>
    );
};

export default UpdatePost;