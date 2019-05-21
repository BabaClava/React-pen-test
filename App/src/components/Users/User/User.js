import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import s from './User.module.sass';
import avatarPlaceholder from '../../../assets/img/profileAvatar.jpg';

const User = (props) => {
  let onFollowChange = (e) => { 
    props.onFollowChange(parseInt(e.target.id)) 
  };  

  return (
    <Container className={s.container}>
      <Row>
        <Col xs="2" className={s.container}>
          <img src={props.avatar || avatarPlaceholder} className={s.avatar} alt='avatar'/>
          <button
            id={props.id}
            className={s.followStatus}
            onClick={onFollowChange}
          >
            {props.follow ? "Unfollow" : "Follow"}
          </button>
        </Col>
        <Col className={s.container}>
          <Row className='h-100'>
            <Col className={s.about}>
              <div>
                <span>{props.name} </span>
                <span>{props.surname}</span>
              </div>
              <div>
                <span>{props.title}</span>
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