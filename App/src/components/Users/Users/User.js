import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import s from './User.module.sass';
import avatarPlaceholder from '../../../assets/img/profileAvatar.jpg';

const User = (props) => {
  let user = props.user;
  let onFollowChange = (e) => { 
    props.onFollowChange(parseInt(e.target.id)) 
  };

  console.log(props);
  

  return (
    <Container className={s.container}>
      <Row>
        <Col xs="2" className={s.container}>
          <img src={user.avatar} className={s.avatar} alt='avatar'/>
          <button
            id={user.id}
            className={s.followStatus}
            onClick={onFollowChange}
          >
            {user.follow ? "Unfollow" : "Follow"}
          </button>
        </Col>
        <Col className={s.container}>
          <Row className='h-100'>
            <Col className={s.about}>
              <div>
                <span>{user.name} </span>
                <span>{user.surname}</span>
              </div>
              <div>
                <span>{user.title}</span>
              </div>
            </Col>
            <Col xs="3" className={s.location}>
              <span>{user.country}</span>
              <span>{user.city}</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default User;