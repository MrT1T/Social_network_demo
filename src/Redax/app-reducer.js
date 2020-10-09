import {authAPI} from "../API/api";
import {stopSubmit} from "redux-form";
import {getAuthUserData} from "./auth-reducer";

const INITIALAIZED_SUCCESS = 'app/INITIALAIZED_SUCCESS';


let initialState = {
    initialaized: false,

}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALAIZED_SUCCESS:
            return {
                ...state,
                initialaized: true
            };
        default:
            return state;
    }

}
const initialaizedSuccess = () => ({type: INITIALAIZED_SUCCESS});

export const initialaizeApp = () => async (dispatch) => {
        await dispatch(getAuthUserData());
        dispatch(initialaizedSuccess());
}

export default appReducer;