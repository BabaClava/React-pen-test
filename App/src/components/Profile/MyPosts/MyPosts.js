import React from "react";
import s from "./MyPosts.module.sass";
import Post from "./Post/Post";
import MyPostsForm from '../../commons/Forms/MyPostsForm';

const MyPosts = props => {
  
  let postsElements = props.postsData.map(el => (
    <Post post={el.post} likesCount={el.likesCount} key={el.post} />
  ));

  let onPostSend = (data) => props.onPostSend(data.message);

  return (
    <div className={s.postContainer}>
      <MyPostsForm onSubmit={onPostSend} />  
      {postsElements}
    </div>
  );
};

export default MyPosts;
