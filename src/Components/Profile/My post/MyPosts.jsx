import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../Utils/Validators/Validators";
import {Textarea} from "../../Common/FormsControls/FormsControls";
import Member from "../../assets/img/member.png"


const maxLength20 = maxLengthCreator(20);

const MyPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name={'post'} validate={[required, maxLength20]}/>
            </div>
            <div>
                <button className={s.buttonAdd}>Add post</button>
            </div>
        </form>
    )
}
const MyPostReduxForm = reduxForm({form: 'addPost'})(MyPostForm)

const MyPosts = (props) => {

    let postElements = props.posts.map(p => <Post key={p.id} massege={p.message} likesCount={p.likesCount}/>)
    let onAddPost = (value) => {
        props.addPost(value.post);
    }
    return (
        <div className={s.container}>
            <div className={s.member}>
                <a href='#/Users'><img src={Member}/></a>
            </div>
            <div className={s.posts}>
                <h3>My posts</h3>
                <MyPostReduxForm onSubmit={onAddPost}/>
                <div>
                    {postElements}
                </div>
            </div>
        </div>
    )
}

export default MyPosts;