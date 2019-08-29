import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import s from './User.module.sass';
import avatarPlaceholder from '../../../assets/img/profileAvatar.jpg';
import { NavLink } from 'react-router-dom';
import { UserApi } from '../../../api';

const User = (props) => {
  let follow = () => {
    props.followingInProgressToggler(true, props.id)
    UserApi.follow(props.id)
    .then(data => {
      if (data.resultCode === 0) props.follow(props.id);
      props.followingInProgressToggler(false, props.id)
    });
  };
  let unfollow = (e) => {
    props.followingInProgressToggler(true, props.id)
    UserApi.unfollow(props.id)
    .then(data => {
      if (data.resultCode === 0) props.unfollow(props.id);
      props.followingInProgressToggler(false, props.id);
    })
  };  
  return (
    <Container className={s.container}>
      <Row>
        <Col xs="2" className={s.container}>
          <NavLink to={`/profile/${props.id}`}>
            <img src={props.photos.small ? `http://localhost:3002/${props.photos.small}`: avatarPlaceholder} className={s.avatar} alt='avatar'/>
          </NavLink>
          {
            props.followed 
            ? <button 
            disabled = {props.followingInProgress.some(id => id === props.id)}
            onClick = {unfollow}>Unfollow
              </button>
            : <button 
            disabled = {props.followingInProgress.some(id => id === props.id)}
                onClick = {follow}>Follow
              </button>
          }
        </Col>
        <Col className={s.container}>
          <Row className='h-100'>
            <Col className={s.about}>
              <div>
                <span>{props.name} </span>
                <span>{props.surname}</span>
              </div>
              <div>
                <span>{props.status}</span>
              </div>
            </Col>
            <Col xs="3" className={s.location}>
              <span>{props.country}</span>
              <span>{props.city}</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default User;