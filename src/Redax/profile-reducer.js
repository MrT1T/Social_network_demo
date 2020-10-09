import {profileAPI} from "../API/api";
import {stopSubmit} from "redux-form";


const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_STATUS = 'profile/SET_STATUS';
const DELETE_POST = 'profile/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS';

let initialState = {
    posts: [
        {id: 1, message: 'My name is Eugene', likesCount: 125},
        {id: 2, message: 'How are you?', likesCount: 215},
    ],
    profile: null,
    status: ''
}


const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {id: 5, message: action.newPost, likesCount: 0}],
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(posts => posts.id !== action.postId),
            };
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos},
            };
        default:
            return state;
    }

}

export const addPost = (newPost) => ({type: ADD_POST, newPost});
export const setUsersProfileSuccess = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});
export const deletePost = (postId) => ({type: DELETE_POST, postId});
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos});

export const setUsersProfile = (userId) => async (dispatch) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(setUsersProfileSuccess(data))

}

export const getStatus = (userId) => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(setStatus(data))
}

export const updateStatus = (status) => async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
                if (data.resultCode === 0)
                    dispatch(setStatus(status))
}
export const savePhoto = (file) => async (dispatch) => {
        let data = await profileAPI.savePhoto(file)

    if (data.resultCode === 0)
        dispatch(savePhotoSuccess(data.data.photos))
}
export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile)

    if (data.resultCode === 0) {
        dispatch(setUsersProfile(userId))
    } else{

        dispatch(stopSubmit('edit_profile', {_error: data.messages[0]}))
        return Promise.reject(data.messages[0]);
    }
 }

export default profileReducer;