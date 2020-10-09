import {authAPI, securityAPI} from "../API/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_CAPTCHA = 'auth/SET_CAPTCHA';


let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null

}


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            };
        case SET_CAPTCHA:
            return {
                ...state, captchaUrl: action.captcha
            };
        default:
            return state;
    }

}
const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
});
const setCaptcha = (captcha) => ({type: SET_CAPTCHA, captcha});

export const getAuthUserData = () => async (dispatch) => {
    let data = await authAPI.me();

    if (data.resultCode === 0) {
        let {id, email, login} = data.data;
        dispatch(setAuthUserData(id, email, login, true))
    }

};


export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe, captcha);
    if (data.resultCode === 0) {
        dispatch(getAuthUserData())
    }  else {
        if(data.resultCode === 10){
            dispatch(getCaptchaUrl())
        }
        let errorMessage = data.messages.length > 0 ? data.messages[0] : 'Some error';
        dispatch(stopSubmit('login', {_error: errorMessage}))
    }
}
export const getCaptchaUrl = (email, password, rememberMe) => async (dispatch) => {
    let response = await securityAPI.getCaptchaUrl();
    const captcha = response.data.url;
    dispatch(setCaptcha(captcha))
}

export const logout = () => async (dispatch) => {
    let data = await authAPI.logout()
    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }

}


export default authReducer;