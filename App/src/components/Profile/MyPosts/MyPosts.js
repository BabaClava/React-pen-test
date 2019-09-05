import React from "react";
import s from "./MyPosts.module.sass";
import Post from "./Post/Post";
import MessageForm from '../../commons/MessageForm';
import {reduxForm} from 'redux-form';

const MyPosts = props => {
  
  let postsElements = props.postsData.map(el => (
    <Post post={el.post} likesCount={el.likesCount} key={el.post} />
  ));

  let onPostSend = (data) => props.onPostSend(data.message);

  const Form = reduxForm({form: 'myPost'})(MessageForm);

  return (
    <div className={s.postContainer}>
      <Form onSubmit={onPostSend} />  
      {postsElements}
    </div>
  );
};

export default MyPosts;
