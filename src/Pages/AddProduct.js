import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
    let navigate = useNavigate()

    const initialValues = {
        title:'',
        instruction:'',
        expireDate:null,
        productCode:null
    }
    const onSubmit = (data) =>{
        const accessToken = localStorage.getItem("accessToken")
        if(!accessToken){alert('Please log in')}
        else{
            axios.post('https://recipe-all.onrender.com/products',data,{
            headers:{
                accessToken:localStorage.getItem("accessToken")
            }
        }).then((response)=>{
                console.log(data)
            navigate('/')
            
            
        })
        }
        
    }
    const validationSchema = Yup.object().shape({
        title:Yup.string().required(),
        instruction:Yup.string().required(),
        expireDate:Yup.date(),
        productCode:Yup.string()
    })
    
    return (
        <div className="container mt-5">
            <h2>Add a Product</h2>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form>
                    <div className="mb-3">
                        <label htmlFor="inputAddProductTitle" className="form-label">
                            Title:
                        </label>
                        <Field
                            type="text"
                            id="inputAddProductTitle"
                            name="title"
                            className="form-control"
                            placeholder="The product title"
                        />
                        <ErrorMessage name="title" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="inputAddProductInstruction" className="form-label">
                            Instruction:
                        </label>
                        <Field
                            type="text"
                            id="inputAddProductInstruction"
                            name="instruction"
                            className="form-control"
                            placeholder="e.g., Preheat the oven..."
                        />
                        <ErrorMessage name="instruction" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="inputAddProductExpireDate" className="form-label">
                            Expire Date:
                        </label>
                        <Field
                            type="date"
                            id="inputAddProductExpireDate"
                            name="expireDate"
                            className="form-control"
                            placeholder="Best Before"
                        />
                        <ErrorMessage name="expireDate" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="inputAddProductCode" className="form-label">
                            Product Code:
                        </label>
                        <Field
                            type="text"
                            id="inputAddProductCode"
                            name="productCode"
                            className="form-control"
                            placeholder=""
                        />
                        <ErrorMessage name="productCode" component="div" className="text-danger" />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Add Product
                    </button>
                </Form>
            </Formik>
        </div>
    );
};

export default AddProduct;