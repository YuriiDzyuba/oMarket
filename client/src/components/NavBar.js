import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { ADMIN_PAGE_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../consts/pagePaths';
import style from './navbar.module.scss';

const NavBar = () => (
    <Navbar className={style.navbar} variant="dark">
        <Container>
            <NavLink to={HOME_ROUTE}>buy</NavLink>
            <Nav className="ml-auto">
                <NavLink to={LOGIN_ROUTE}>log in</NavLink>
                <NavLink to={REGISTRATION_ROUTE}>registration</NavLink>
                <NavLink to={ADMIN_PAGE_ROUTE}>admin</NavLink>
            </Nav>
        </Container>
    </Navbar>
);

export default NavBar;
