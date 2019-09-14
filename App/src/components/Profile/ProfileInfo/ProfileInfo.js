import React from "react";
import s from './ProfileInfo.module.sass';
import Preloader from '../../commons/Preloader';
import avatarPlaceholder from '../../../assets/img/profileAvatar.jpg';
//import StatusBar from './StatusBar/StatusBar'
import StatusBarHook from './StatusBar/StatusBarHook'

const ProfileInfo = (props) => {
  if(!props.profile) return <Preloader />

  return (
    <div>
      <div className={s.profileHeader}>
      </div>
      <div className={s.avatarContainer}>
        <img src={props.profile.photos.large ? `http://localhost:3002/${props.profile.photos.large}` : avatarPlaceholder}  alt='profileInfo'/>
        ava + description
      </div>
      <div>
        <StatusBarHook status={props.status} updateStatus={props.updateStatus}/>
      </div>
    </div>
  );
};

export default ProfileInfo;
