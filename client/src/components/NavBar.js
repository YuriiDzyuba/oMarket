import React from 'react';
import {NavLink} from "react-router-dom";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../consts/pagePaths";
import {useHistory} from 'react-router-dom'


const NavBar = () => {

    const history = useHistory()
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink to={SHOP_ROUTE}>buy</NavLink>
                    <Nav className="ml-auto">
                        <Button
                            variant={'dark'}
                            onClick={() => history.push(LOGIN_ROUTE)}>Out</Button>
                        <Button
                            variant={'dark'}
                            onClick={() => history.push(ADMIN_ROUTE)}>Admin</Button>
                    </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;
