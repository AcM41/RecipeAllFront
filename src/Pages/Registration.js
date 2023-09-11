import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {useNavigate} from 'react-router-dom'
import * as Yup from "yup";
import axios from "axios";

function Registration() {
        let navigate = useNavigate()
        const initialValues = {
            username: "",
            password: "",
        };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(4).max(20).required(),
    });

    const onSubmit = (data) => {
    axios.post("https://recipe-all.onrender.com/auth", data).then(() => {
        console.log(data);
        navigate('/login')
    });
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                <h2>Registration</h2>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    <Form>
                    <div className="mb-3">
                        <label className="form-label">Username:</label>
                        <ErrorMessage name="username" component="span" />
                        <Field
                        autoComplete="off"
                        className="form-control"
                        id="inputCreatePost"
                        name="username"
                        placeholder="(Ex. John123...)"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <ErrorMessage name="password" component="span" />
                        <Field
                        autoComplete="off"
                        type="password"
                        className="form-control"
                        id="inputCreatePost"
                        name="password"
                        placeholder="Your Password..."
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                    </Form>
                </Formik>
                </div>
            </div>
            </div>
        );
    }
    
    export default Registration;