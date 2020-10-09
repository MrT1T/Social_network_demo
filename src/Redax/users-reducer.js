import {usersAPI} from "../API/api";
import {mapArray} from "../Utils/function-helpers";

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET_USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [],
    pageSize: 20,
    totalUsersCounts: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}


const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users:
                    mapArray(state.users,action.userId,{followed: true})
            };

        case UNFOLLOW:
            return {
                ...state,
                users:
                    mapArray(state.users,action.userId,{followed: false})
            };
        case SET_USERS:
            return {
                ...state, users: [...action.users]
            };
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage};
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCounts: action.totalUsersCounts};
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching};
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            };
        default:
            return state;
    }

}

export const followSuccess = (userId) => ({type: FOLLOW, userId});
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUserCount = (totalUsersCounts) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCounts});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowingProgress = (isFetching, userId) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId
});

export const requestUsers = (currentPage, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    let data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUserCount(data.totalCount));
}

const followUnfollowUser = async (dispatch, userId, methodApi, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userId));
    let data = await methodApi(userId);
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId) => async (dispatch) => {
    followUnfollowUser(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
}

export const unfollow = (userId) => async (dispatch) => {
    followUnfollowUser(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
}

export default usersReducer;