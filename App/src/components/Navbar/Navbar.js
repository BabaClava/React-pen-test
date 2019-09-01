/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import s from './Navbar.module.sass';
import {NavLink} from 'react-router-dom';

const Navbar = () => {  
  
    return (
      <nav className={s.nav}>
        <ul>
          <li>
            <NavLink to='/profile' activeClassName={s.active}>Profile</NavLink>
          </li>
          <li>
            <NavLink to='/dialogs' activeClassName={s.active}>Dialogs</NavLink>
          </li>
          <li><a href="#">News</a></li>
          <li><a href="#">Music</a></li>
          <br/>
          <li>
            <NavLink to='/users' activeClassName={s.active}>Find users</NavLink>
          </li>
          <br/>
          <li><a href="#">Settings</a></li>
        </ul>      
      </nav>
    );
}
 
export default Navbar;