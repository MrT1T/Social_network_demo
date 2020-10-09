import React from 'react';
import s from './Post.module.css';
import avaMessage from '../../../assets/img/ava2.jpg';

const Post = (props) => {
    return (<div className={s.item}>
            <img src={avaMessage}/>
            {props.massege}
            <div>
                <span>{props.likesCount} likes</span>
            </div>
        </div>

    )
}

export default Post;