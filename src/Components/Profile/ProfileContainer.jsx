import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, setUsersProfile, updateStatus, savePhoto, saveProfile} from "../../Redax/profile-reducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    refreshProfile(){
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.autoraizedUserId;
            if (!userId) {
                this.props.history.push('/Login');
            }
        }
        this.props.setUsersProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {

        return (
            <Profile {...this.props} isOwner={!this.props.match.params.userId} />
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    autoraizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

export default compose(
    connect(mapStateToProps, {setUsersProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
     withAuthRedirect)
(ProfileContainer);