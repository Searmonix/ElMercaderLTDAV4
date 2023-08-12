import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import userServices from "../../services/user.js";
import { login } from "../../store/slices/auth/AuthSlices";

import { useFormik } from 'formik';
import * as Yup from 'yup';


import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

const Login = () => {
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const effect = () => {
        if (token)
            navigate('/');
    };

    useEffect(effect, []);


    const initialValues = {
        email: '',
        password: ''
    }

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid Email').required('Email Required'),
        password: Yup.string().required('Password Required')
    });

    function onSubmit(values) {
        console.log(values);
        userServices.
            logUser(values).
            then(res => {
                console.log(res);
                const { id, email, type } = res;
                dispatch(login({ id, email, type }));
                navigate('/');
            })
            ;
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    });

    return (
        <>
            <div className="Title-1">
                <h1>El Mercader LTDA</h1>
                <hr />
                <h2>Login Form</h2>

                <Container className="" style={{ maxWidth: '100vh' }}>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group controlId={`formEmail`} >
                            <Form.Label><b>{`Email`} :</b></Form.Label>
                            <Form.Control
                                name='email'
                                type='input'
                                value={formik.values.email}
                                placeholder='usaestecorreo@gmail.com'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                isInvalid={!!formik.errors.email && formik.touched.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId={`formPassword`} >
                            <Form.Label><b>{`Password`} :</b></Form.Label>
                            <Form.Control
                                name='password'
                                type='password'
                                value={formik.values.password}
                                placeholder='1234'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                isInvalid={!!formik.errors.password && formik.touched.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button className="w-100" variant="primary" type="submit">
                            {"Log in"}
                        </Button>
                    </Form>
                </Container>
            </div>
        </>
    )
}

export default Login;
