import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DilogsItem/DialogsItem";
import Message from "./Message/Message";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../Common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../Utils/Validators/Validators";


const Dialogs = (props) => {

    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}
                                                                         ava={d.ava}/>)
    let messageElements = props.dialogsPage.message.map(m => <Message message={m.message} key={m.id}/>)
      let addMessage = (values) => {
        props.addMessage(values.newMassageBody);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
               <div>{messageElements}</div>
                <AddMessageFormRedux onSubmit={addMessage}/>
            </div>
        </div>
    )
}

const maxLength50 = maxLengthCreator(50);

const AddMessageForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div><Field component={Textarea} name={'newMassageBody'}
                        validate={[required, maxLength50]}/></div>
            <div> <button className={s.buttonAdd} >Send</button></div>
        </form>

    )
}
const AddMessageFormRedux = reduxForm({form: 'addPost'})(AddMessageForm)



export default Dialogs;