import React, {useState} from 'react';
import {Button, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../consts/pagePaths";
import {login, registration} from "../http/userApi";

const Registration = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE

    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')

    const click = async () =>{
        if (isLogin){
            const response = await login()
        } else {
            const response = await registration(email, password)
        }
    }



    return (
        <Container
            className="d-flex justify-content-center align-items-center authPage"
        >
            <Form
                className=" authPage__form"
            >
                <h3>{isLogin ? "Auth" : "Registration"}</h3>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                    />
                </Form.Group>
                <Row
                    className="g-1 "
                >
                    {isLogin ?
                        <div
                            className="col-8"
                        >
                            dont have an account? <NavLink to={REGISTRATION_ROUTE}>registration</NavLink>
                        </div>
                        :
                        <div
                            className="col-8"

                        >
                            have account? <NavLink to={LOGIN_ROUTE}>login</NavLink>
                        </div>
                    }
                    <div
                        className="col d-grid justify-content-md-end"

                    >
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
