import React from 'react';
import { Button, Card, Col, Container, FormControl, InputGroup, Row } from 'react-bootstrap';
import style from './home.module.scss';
import Footer from '../components/Footer';

const Home = () => (
    <>
        <Container fluid className={style.searchBlock}>
            <Container>
                <InputGroup className={` ${style.searchBlock__inputGroup}`}>
                    <InputGroup.Text className={` ${style.searchBlock__input}`}>search</InputGroup.Text>
                    <FormControl aria-label="First name"/>
                    <InputGroup.Text>in</InputGroup.Text>
                    <FormControl aria-label="Last name"/>
                    <Button variant="secondary" id="button-addon1">
                        search
                    </Button>
                </InputGroup>
            </Container>
        </Container>
        <Container fluid className={style.mainCategories}>
            <Container>
                <Row>
                    <h2 className={'text-center mb-5'}>Categories</h2>
                </Row>
                <Row className={'row-cols-2 row-cols-lg-4 g-3 g-lg-4'}>
                    <Col>
                        <Card style={{ width: '100%' }}>
                            <Card.Img variant="top" src="https://a1z.ru/images/design/7-stilnyy-i-utonchennyy-tsveta-dlya-website.jpg" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '100%' }}>
                            <Card.Img variant="top" src="https://a1z.ru/images/design/7-stilnyy-i-utonchennyy-tsveta-dlya-website.jpg" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '100%' }}>
                            <Card.Img variant="top" src="https://a1z.ru/images/design/7-stilnyy-i-utonchennyy-tsveta-dlya-website.jpg" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '100%' }}>
                            <Card.Img variant="top" src="https://a1z.ru/images/design/7-stilnyy-i-utonchennyy-tsveta-dlya-website.jpg" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
            </Container>
        </Container>
        <Container fluid className={style.topAds}>
            <Container>
                <Row>
                    <h2 className={'text-center mb-5'}>Top advertisements</h2>
                </Row>
                <Row className={'row-cols-2 row-cols-lg-4 g-3 g-lg-4'}>
                    <Col>
                        <Card style={{ width: '100%' }}>
                            <Card.Img variant="top" src="https://a1z.ru/images/design/7-stilnyy-i-utonchennyy-tsveta-dlya-website.jpg" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '100%' }}>
                            <Card.Img variant="top" src="https://a1z.ru/images/design/7-stilnyy-i-utonchennyy-tsveta-dlya-website.jpg" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '100%' }}>
                            <Card.Img variant="top" src="https://a1z.ru/images/design/7-stilnyy-i-utonchennyy-tsveta-dlya-website.jpg" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '100%' }}>
                            <Card.Img variant="top" src="https://a1z.ru/images/design/7-stilnyy-i-utonchennyy-tsveta-dlya-website.jpg" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <a href="/" className={'text-center pt-4'}>show all advertisements</a>
                </Row>
            </Container>
        </Container>
        <Footer/>
    </>
);

export default Home;
