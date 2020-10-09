import React from 'react';
import s from './../Dialogs.module.css';
import {NavLink} from "react-router-dom";


const DialogItem = (props) => {
    let link = '/Dialogs/' + props.id;
    let linkimg = props.ava;
    return (

    <div className={s.dialog + ' ' + s.active+' '+s.avatar}>
        <img src={linkimg} alt=""/>
        <NavLink to={link}>{props.name}</NavLink>
    </div>
)
}

export default DialogItem;