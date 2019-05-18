import React from "react";
import s from "./MyPosts.module.sass";
import Post from "./Post/Post";

const MyPosts = props => {
  
  let postsElements = props.postsData.map(el => (
    <Post post={el.post} likesCount={el.likesCount} />
  ));

  let onPostChange = (e) => props.onPostChange(e.target.value);
  let onPostSend = () => props.onPostSend();

  return (
    <div className={s.postContainer}>
      <div>
        <textarea
          value={props.newPostText}
          onChange={onPostChange}
          />
        <button onClick={onPostSend}>Add post</button>
      </div>
      {postsElements}
    </div>
  );
};

export default MyPosts;
