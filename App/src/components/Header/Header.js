import React from 'react';
import s from './Header.module.sass'
import {Col} from 'reactstrap';

const Header = () => {
    return (
      <Col tag='header' className={s.header}>header</Col>
    );
}

export default Header;