import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./My post/MyPostsContainer";

const Profile = (props) => {

    return (
        <div className={s.wrapper}>
            <div><ProfileInfo profile={props.profile}
                            status={props.status}
                            updateStatus={props.updateStatus}
                            isOwner={props.isOwner}
                            savePhoto={props.savePhoto}
                            saveProfile={props.saveProfile}/></div>
            <div className={s.myPost}><MyPostsContainer/></div>
        </div>
    )
}

export default Profile;