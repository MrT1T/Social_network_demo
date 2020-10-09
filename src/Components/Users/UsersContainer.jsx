import React from "react";
import {connect} from "react-redux";
import {
    follow, requestUsers,
    setCurrentPage,
    toggleFollowingProgress,
    unfollow
} from "../../Redax/users-reducer";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCounts, getUsers
} from "../../Redax/Users-selectors";

class UsersContainer extends React.Component {
    componentDidMount() {

    this.props.requestUsers(this.props.currentPage,this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.requestUsers(pageNumber,this.props.pageSize);
    }

    render() {

        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCounts={this.props.totalUsersCounts}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   followingInProgress={this.props.followingInProgress}/>
        </>

    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCounts: getTotalUsersCounts(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose(
    connect(mapStateToProps, {
    follow, unfollow, setCurrentPage,
    toggleFollowingProgress, requestUsers}))
    // withAuthRedirect)
(UsersContainer);

