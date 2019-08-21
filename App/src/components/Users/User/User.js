import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import s from './User.module.sass';
import avatarPlaceholder from '../../../assets/img/profileAvatar.jpg';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const User = (props) => {
  let follow = (e) => { 
    props.follow(Number(e.target.id)) 
  };
  let unfollow = (e) => { 
    props.unfollow(Number(e.target.id)) 
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
            ? <button onClick = {() => {
                axios.delete(`http://localhost:3002/api/follow/${props.id}`,
                {
                  withCredentials: true
                })
                .then(res => {
                  if (res.data.resultCode === '0') unfollow(props.id)
                });
              }}>Unfollow</button>
            : <button onClick = {() => {
                axios.post(`http://localhost:3002/api/follow/${props.id}`, {},
                {
                  withCredentials: true
                })
                .then(res => {
                  if (res.data.resultCode === '0') follow(props.id)
                });
              }}>Follow</button>
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