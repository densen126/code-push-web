
import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { Navbar } from 'react-bootstrap';
import s from './Header.css';
import Link from '../Link';
import Navigation from '../Navigation';

export interface HeaderProps {
    isAuth?: boolean;
    noNav?: boolean;
}

function Header({ isAuth = false, noNav = false }: HeaderProps) {
    return (
        <Navbar style={{ fontWeight: 400 }} inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link className={s.brand} to="/">
                        <span>CodePush Server</span>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            {!noNav ? <Navigation isAuth={isAuth} /> : null}
        </Navbar>
    );
}

export default withStyles(s)(Header);
