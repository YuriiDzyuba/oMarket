import React, { useState } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE } from '../consts/pagePaths';
import style from './registration.module.scss';

const Registration = () => {
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;

    console.log(isLogin);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Container
            className={`d-flex justify-content-center align-items-center authPage ${style.registrationPage}`}
        >
            <Form
                className={style.registrationPage__form}
            >
                <h3>{'Registration'}</h3>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>email address *</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="joedoe@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>password *</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="create password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                        we'll never share your email and password with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>nick name *</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="jon33"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>born year *</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="1999"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Row className="g-1 ">
                    <div className="col-8">
                        have account? <NavLink to={LOGIN_ROUTE}>login</NavLink>
                    </div>

                    <div className="col d-grid justify-content-md-end">
                        <Button
                            className="align-self-end"
                            variant="outline-primary"
                            type="submit">
                            Submit
                        </Button>
                    </div>
                </Row>
            </Form>
        </Container>
    );
};

export default Registration;
