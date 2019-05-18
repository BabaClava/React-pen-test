import React from "react";
import s from './ProfileInfo.module.sass'

const ProfileInfo = () => {
  return (
    <div>
      <div className={s.profileHeader}>
        <img src="https://static.euronews.com/articles/stories/03/21/73/66/880x495_cmsv2_298e3b01-877d-57e3-9ce0-0542084c5af4-3217366.jpg" />
      </div>
      <div className={s.avatarContainer}>ava + description</div>
    </div>
  );
};

export default ProfileInfo;
