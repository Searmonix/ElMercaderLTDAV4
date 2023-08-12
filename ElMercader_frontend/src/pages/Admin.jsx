import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar";

import userServices from "../services/user";
import { useEffect, useState } from "react";

import * as Yup from 'yup';
import { useFormik } from 'formik';

import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

function AdminForm({ onSubmitHandler }) {
    const requiredField = 'Field is required';

    const initialValues = {
        id: '', identification: '', name: '', birthtDay: '', monthBirthtDay: '', address: '',
        cellPhone: '', email: '', password: '', zone: '', type: ''
    };

    const validationSchema = Yup.object({
        id: Yup.number().required(requiredField),
        identification: Yup.string().required(requiredField),
        name: Yup.string().required(requiredField),
        birthtDay: Yup.date().required(requiredField),
        monthBirthtDay: Yup.string().required(requiredField),
        address: Yup.string().required(requiredField),
        cellPhone: Yup.string().required(requiredField),
        email: Yup.string().email('Invalid Email').required(requiredField),
        password: Yup.string().required(requiredField),
        zone: Yup.string().required(requiredField),
        type: Yup.string().required(requiredField)
    });

    function onSubmit(values) {
        userServices.createUser(values)
            .then(res => {
                onSubmitHandler(res);
            })
        ;
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    });

    const fieldEntries = Object.keys(formik.values)
        .reduce((prev, key) => {
            prev[key] = {
                name: key,
                label: key,
                type: 'input',
                value: key
            }

            if (key == 'birthtDay')
                prev[key] = { ...prev[key], type: 'date' }
            else if (key == 'email')
                prev[key] = { ...prev[key], type: 'email' }
            return { ...prev }
        },{})
    ;

    return (
        <Container className="" style={{ maxWidth: '100vh' }}>
            <Form onSubmit={formik.handleSubmit}>
                {
                    Object.values(fieldEntries).map(
                        ({ name, label, value, placeHolder, type, isInvalid }) => {
                            return (
                                name !== 'type' ?
                                    <Form.Group controlId={`form${name}`} key={name} >
                                        <Form.Label>{label} :</Form.Label>
                                        <Form.Control
                                            name={name}
                                            type={type}
                                            value={formik.values[name]}
                                            placeholder=''
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            isInvalid={!!formik.errors[name] && formik.touched[name]}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors[name]}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    :
                                    <Form.Group controlId={`form${name}`} key={name} >
                                        <Form.Label>{label}</Form.Label>
                                        <Form.Select
                                            name={name}
                                            value={formik.values[name]}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isInvalid={!!formik.errors[name] && formik.touched[name]}
                                        >
                                            <option>Select Privileges</option>
                                            <option value="COORD">Coordinator</option>
                                            <option value="ASE">Advisor</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors[name]}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                            )
                        }
                    )
                }
                <Button className="w-100" variant="primary" type="submit">
                    {"Crear"}
                </Button>
            </Form>
        </Container>
    )
}


function AdminContent() {
    const [users, setUsers] = useState([]);

    function effect() {
        userServices
            .getUsers()
            .then(res => {
                setUsers(res);
            })
            .catch(error => {
                console.log(`Try later`, error);
                setPersons([])
            })
    };

    useEffect(effect, []);

    function onSubmitHandler(values) {
        delete values['confirm_password'];

        console.log(values);

        userServices
            .createUser(values)
            .then(res => {
                setUsers(users.concat(res));
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="Title-1">

            <h3 id="userRegistered"></h3>

            <div id="content">
                <h2>Usuarios Registrados</h2>
                <p className="d-inline-flex gap-1">
                    <a className="btn btn-outline-secondary" data-bs-toggle="collapse" href="#usuariosCollapse" role="button" aria-expanded="false" aria-controls="collapseExample">
                        Ver usuarios
                    </a>
                    <a className="btn btn-outline-secondary" data-bs-toggle="collapse" href="#crearUsuarioCollapse" role="button" aria-expanded="false" aria-controls="collapseExample">
                        Agregar un nuevo usuario
                    </a>
                </p>
                <div className="collapse" id="usuariosCollapse">
                    <div className="card card-body">

                        <div>
                            <table className="table table-striped" id="userTable">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>IDENTIFICATION</th>
                                        <th>NAME</th>
                                        <th>ADRESS</th>
                                        <th>PHONE NUMBER</th>
                                        <th>E-MAIL</th>
                                        <th>PASSWORD</th>
                                        <th>ZONE</th>
                                        <th>TYPE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {

                                        users.map(user => {
                                            return (
                                                <tr key={user.id}>
                                                    {
                                                        Object.entries(user).map(
                                                            ([key, val]) => <td key={key}>{val}</td>
                                                        )
                                                    }
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="collapse" id="crearUsuarioCollapse">
                    <div className="card card-body">
                        <AdminForm onSubmitHandler={(obj) => setUsers(users => users.concat(obj))}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Admin() {

    return (
        <>
            <Navbar />
            <AdminContent />
        </>
    )
}

export default Admin;