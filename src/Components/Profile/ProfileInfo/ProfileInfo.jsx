import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../Common/Preloader/Preloader";
import UserPhoto from "../../assets/img/user.png";
import ProfileStatus from "./ProfileStatus";
import ProfileDataForm from "../ProfileDataForm";

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }
    const onSubmit = (formData) => {
        saveProfile(formData).then(() => {
            setEditMode(false);
        })

    }

    return (
        <div className={s.container}>
                <div className={s.avatar}>
                    {profile.photos.large !== null ? <img src={profile.photos.large}/> : <img src={UserPhoto}/>}
                    {isOwner && <div className={s.avatarFile}>
                        <label><input className={s.avatarFileInput}
                                      type="file" name="file"onChange={onMainPhotoSelected}/>> Change foto </label>
                    </div>}

                    <div className={s.status} ><ProfileStatus status={status} updateStatus={updateStatus}/></div>
                </div>
            <div className={s.information}>
                    {editMode
                        ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                        : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => {
                            setEditMode(true)
                        }}/>
                    }
            </div>
        </div>
    )
}

const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return <div>

        <div>
            <b>Full name:</b> {profile.fullName}
        </div>
        <div>
            <b>Loking for a job:</b> {profile.lookingForAJob ? 'Yes' : 'No'}
        </div>
        <div>
            <b>My professional skills:</b> {profile.lookingForAJobDescription}
        </div>
        <div>
            <b>About me:</b> {profile.aboutMe}
        </div>
        <div>
            <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        })}
        </div>
        {isOwner && <div className={s.buttonContainer}>
            <label><input className={s.buttonContainerInput} onClick={goToEditMode}/>> Edit </label>
        </div>}
    </div>
}


export const Contact = ({contactTitle, contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}:</b>{contactValue}</div>
}

export default ProfileInfo;