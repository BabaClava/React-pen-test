import React from "react";
import s from './ProfileInfo.module.sass';
import Preloader from '../../commons/Preloader';
import avatarPlaceholder from '../../../assets/img/profileAvatar.jpg';
//import StatusBar from './StatusBar/StatusBar'
import StatusBarHook from './StatusBar/StatusBarHook';
import ProfileDescription from './ProfileDescription';
import ProfileEditForm from '../../commons/Forms/ProfileEditForm';

const ProfileInfo = ({profile, status, updateStatus}) => {

  if(!profile) return <Preloader />

  const initialValues = {
    fullName: profile.fullName,
    aboutMe: profile.aboutMe,
    lookingForAJob: profile.lookingForAJob,
    lookingForAJobDescription: profile.lookingForAJobDescription,
    contacts: profile.contacts
  }

  const submit = (formData) => console.log(formData)

  return (
    <div>
      <div className={s.profileHeader}>
      </div>
      <div className={s.avatarContainer}>
        <img src={profile.photos.large ? `http://localhost:3002/${profile.photos.large}` : avatarPlaceholder}  alt='profileInfo'/>
        <StatusBarHook status={status} updateStatus={updateStatus}/>
      </div>
      <div>
        {/* <ProfileDescription profile={profile}/> */}
        <ProfileEditForm profile={profile} initialValues={initialValues} onSubmit={submit}/>
      </div>
    </div>
  );
};

export default ProfileInfo;
