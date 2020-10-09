import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";

const Navbar = (props) => {

        return <nav className={s.nav}>
        <div className={s.item}>
            <NavLink to='/Profile' activeClassName={s.activeLink}>Profile</NavLink>

            <NavLink to='/Dialogs' activeClassName={s.activeLink}>Messages</NavLink>

            <NavLink to='/Users' activeClassName={s.activeLink}>Users</NavLink>

            {/*<NavLink to='/News' activeClassName={s.activeLink}>News</NavLink>*/}

            {/*<NavLink to='/Music' activeClassName={s.activeLink}>Music</NavLink>*/}

            {/*<NavLink to='/Settings' activeClassName={s.activeLink}>Settings</NavLink>*/}
            <span className={s.LoginBlok}>
                {props.isAuth
                    ? <div className={s.login}>{props.login} - <button onClick={props.logout}>Log out</button></div>
                    : <NavLink to={'/login'}>Login</NavLink>}
            </span>
        </div>

    </nav>
}

export default Navbar;