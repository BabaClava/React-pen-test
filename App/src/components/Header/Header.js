import React from 'react';
import s from './Header.module.sass';
import {Col} from 'reactstrap';
import {NavLink} from 'react-router-dom';

const Header = (props) => {
    return (
      <Col tag='header' className={s.header}>header
        <div className={s.loginBlock}>
          {
            props.isAuth 
            ? props.login
            : <NavLink to={'/login'}>Login</NavLink>
          }
        </div>
      </Col>
    );
}

export default Header;