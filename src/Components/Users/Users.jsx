import React from "react";
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";
import s from "./Users.module.css";

const Users = React.memo((props) => {
        return (
            <div>
                <div>
                    <Paginator currentPage={props.currentPage} onPageChanged={props.onPageChanged}
                              totalItemsCounts={props.totalUsersCounts} pageSize={props.pageSize}/>
                </div>
                <div className={s.users}>{
                    props.users.map(u => <User key={u.id} user={u} followingInProgress={props.followingInProgress}
                                               unfollow={props.unfollow} follow={props.follow}/>)
                }</div>
            </div>
        )
    }
)
export default Users;