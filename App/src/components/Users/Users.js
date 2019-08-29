import React from "react";
import User from "./User/User";
import { Container, Row, Col } from "reactstrap";
import s from './Users.module.sass';

const Users = props => {
  let usersElements = props.users.map(el => (
    <User {...el}
          follow={props.follow}
          unfollow={props.unfollow}
          isFetching={props.isFetching}
          followingInProgress={props.followingInProgress}
          followingInProgressToggler={props.followingInProgressToggler}
          key={el.id} />
  ));  

  return (
    <Container>
      Users
      <Row>
        <Col>{usersElements}</Col>
      </Row>
      <Row>
        <Col className={s.buttonContainer}>
          <div>
            <button onClick={() => props.onTestClick()}>Show more</button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Users;
