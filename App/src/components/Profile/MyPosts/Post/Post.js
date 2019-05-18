import React from 'react';
import s from './Post.module.sass';
import avatarSmall from '../../../../assets/img/avatarSmall.png';

const Post = (props) => {
  return (
    <div className={s.postContainer}>
      <img src={avatarSmall} alt='avatar' />
      {props.post}
      <div>
        <span>{props.likesCount}</span>
      </div>
    </div>
  );
}
 
export default Post;