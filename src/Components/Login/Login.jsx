import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../Utils/Validators/Validators";
import {connect} from "react-redux";
import {login} from "../../Redax/auth-reducer";
import {Redirect} from "react-router-dom";
import styles from '../Common/FormsControls/FormsControls.module.css';


const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={'email'} name={'email'} component={Input} validate={[required]}/>
            </div>
            <div>
                <Field placeholder={'Password'} type={'password'} name={'password'} component={Input} validate={[required]}/>
            </div>
            <div>
                <Field component={Input} type={'checkbox'} name={'rememberMe'}/> remember me
            </div>
            {error && <div className={styles.formSummaryError}>
                {error}
            </div>}
            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && <Field placeholder={'captcha'} name={'captcha'} component={Input} validate={[required]}/>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form:'login'})(LoginForm)

const Login = (props) => {

    const onSubmit = (formData) =>{
        props.login(formData.email, formData.password, formData.rememberMe,formData.captcha)
    }
    if(props.isAuth){
        return <Redirect to={'/profile'}/>
    }
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
}

const mapStateToProps = (state)=> ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect (mapStateToProps,{login}) (Login);