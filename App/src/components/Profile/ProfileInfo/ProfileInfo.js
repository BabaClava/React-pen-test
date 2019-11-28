import React from "react";
import s from './ProfileInfo.module.sass';
import Preloader from '../../commons/Preloader';
import avatarPlaceholder from '../../../assets/img/profileAvatar.jpg';
//import StatusBar from './StatusBar/StatusBar'
import StatusBarHook from './StatusBar/StatusBarHook';
import ProfileDescription from './ProfileDescription';
import ProfileEditForm from '../../commons/Forms/ProfileEditForm';
import PhotoEditor from './PhotoEditor/PhotoEditor';

const ProfileInfo = ({
  isOwner,
  profile, 
  updateProfile,
  profileEditMod,
  editProfileToggler,
  avatarEditMod,
  editAvatarToggler,
  updateAvatar,
  status,
  updateStatus}) => {

  if(!profile) return <Preloader />

  const initialValues = {
    fullName: profile.fullName,
    aboutMe: profile.aboutMe,
    lookingForAJob: profile.lookingForAJob,
    lookingForAJobDescription: profile.lookingForAJobDescription,
    contacts: profile.contacts
  }
  const editProfileStart = () => editProfileToggler(true);
  const profileEditStop = () => editProfileToggler(false);
  const profileSubmit = (formData) => updateProfile(formData);
  const editAvatarStart = () => editAvatarToggler(true);
  const editAvatarStop = () => editAvatarToggler(false);
  const avatarSubmit = (formData) => updateAvatar(formData);

  const avatarURL = profile.photos.large 
    ? `http://localhost:3002/${profile.photos.large}` 
    : avatarPlaceholder

  return (
    <div className={s.profileHeader}>
      <div className={s.avatarContainer}>
        <PhotoEditor  
          onSubmit={avatarSubmit} 
          start={editAvatarStart} 
          avatarEditMode={avatarEditMod}
          editAvatarStop={editAvatarStop}/>
        <img src={avatarURL} alt='profileInfo'/>
        <br/>
        {isOwner && <button onClick={editAvatarStart}>Edit</button>}
        <StatusBarHook status={status} updateStatus={updateStatus} isOwner={isOwner}/>
      </div>
      <div className={s.infoContainer}>
        {profileEditMod
          ? <ProfileEditForm 
              profile={profile} 
              initialValues={initialValues}
              profileEditStop={profileEditStop}
              onSubmit={profileSubmit}
            />
          : <ProfileDescription 
              profile={profile} 
              editStart={editProfileStart} 
              isOwner={isOwner}
            />
        }
      </div>
    </div>
  );
};

export default ProfileInfo;
