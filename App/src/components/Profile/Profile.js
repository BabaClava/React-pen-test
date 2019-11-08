import React from 'react';
import s from './Profile.module.sass';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const Profile = (props) => {
  
    return (
      <div className={s.profile}>
        <ProfileInfo profile={props.profile} 
                     status={props.status}
                     updateStatus={props.updateStatus}
                     updateProfile={props.updateProfile}
                     profileEditMod={props.profileEditMod}
                     editProfileToggler={props.editProfileToggler}
                     isOwner={props.isOwner}
        />
        <MyPostsContainer />
      </div>
    );
}
 
export default Profile;