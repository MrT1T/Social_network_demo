import React from "react";
import s from './Profile.module.css';
import {Contact} from "./ProfileInfo/ProfileInfo";
import {Input, Textarea} from "../Common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../Utils/Validators/Validators";
import {Field, reduxForm} from "redux-form";
import styles from "../Common/FormsControls/FormsControls.module.css";

 const maxLength100 = maxLengthCreator(100);

const ProfileDataForm = ({profile,handleSubmit,error}) => {
    return(
        <form onSubmit={handleSubmit}>
        <div><button>Save</button></div>
            {error && <div className={styles.formSummaryError}>
                {error}
            </div>}
        <div>
            <b>Full name:</b> <Field placeholder={'Full name'} name={'fullName'} component={Input}/>
        </div>
        <div>
            <b>Loking for a job:</b>
            <Field  name={'lookingForAJob'} component={Input} type={'checkbox'}/>
        </div>
        <div>
            <b>My professional skills:</b>
            <Field placeholder={'My professional skills'} name={'lookingForAJobDescription'} component={Textarea} validate={[required,maxLength100]}/>
        </div>
        <div>
            <b>About me:</b>
            <Field placeholder={'About me'} name={'aboutMe'} component={Textarea} validate={[required, maxLength100]}/>
        </div>
        <div>
            <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
            return <div key={key} className={s.contact}>
                <b>{key}: <Field placeholder={key} name={'contacts.'+key} component={Input} /></b>
            </div>
        })}

        </div>

    </form>
    )
}
const ProfileDataReduxForm = reduxForm({form:'edit_profile'})(ProfileDataForm)
export default ProfileDataReduxForm;