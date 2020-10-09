import React from "react";
import styles from "./Users.module.css";
import UserPhoto from "../assets/img/user.png";
import {NavLink} from "react-router-dom";


const User = React.memo(({user, followingInProgress, unfollow, follow}) => {
    return (
        <div>
            <div className={styles.usersItem}><span>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : UserPhoto}
                             className={styles.userPhoto}/>
                        </NavLink>
                    </div>
                    <div className={styles.buttonFollow}>
                        {user.followed ?
                            <button disabled={followingInProgress.some(id => id === user.id)}
                                    onClick={() => {
                                        unfollow(user.id)
                                    }}> Unfollow</button>
                            : <button disabled={followingInProgress.some(id => id === user.id)}
                                      onClick={() => {
                                          follow(user.id)
                                      }}>Follow </button>}
                    </div>
                </span>
                <span>
                <div>{user.name}</div>
                <div>{user.status}</div>
            </span></div>
        </div>)
})


export default User;