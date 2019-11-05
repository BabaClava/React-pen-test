import React from "react";
import s from './ProfileInfo.module.sass';
import Preloader from '../../commons/Preloader';
import avatarPlaceholder from '../../../assets/img/profileAvatar.jpg';
//import StatusBar from './StatusBar/StatusBar'
import StatusBarHook from './StatusBar/StatusBarHook';
import ProfileDescription from './ProfileDescription';

const ProfileInfo = ({profile, status, updateStatus}) => {

  if(!profile) return <Preloader />

  return (
    <div>
      <div className={s.profileHeader}>
      </div>
      <div className={s.avatarContainer}>
        <img src={profile.photos.large ? `http://localhost:3002/${profile.photos.large}` : avatarPlaceholder}  alt='profileInfo'/>
        <StatusBarHook status={status} updateStatus={updateStatus}/>
      </div>
      <div>
        <ProfileDescription profile={profile}/>
      </div>
    </div>
  );
};

export default ProfileInfo;
