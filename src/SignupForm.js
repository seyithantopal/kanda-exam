import React, { useContext } from 'react';
import './SignupForm.css'
import { UserContext } from './UserContext';
let yup = require('yup');

const SignupForm = () => {
    
    const {state, dispatch} = useContext(UserContext);

    let schema = yup.object().shape({
        firstName: yup.string().required('First name is required'),
        lastName: yup.string().required('Last name is required'),
        email: yup.string().email('Email is not in the right format').required('Email is required'),
        password: yup.string().required('Password is required'),
        confirmedPassword: yup.string().required('Confirm password is required').oneOf([yup.ref("password"), null], "Passwords must match")
    });

    let validate = () => {
        schema.validate(state, { abortEarly: false }).catch((err) => {
            let error = err.inner.reduce((list, error) => {
              if(!list[error.path]) list[error.path] = [];
              list[error.path] = list[error.path].concat(error.errors);
              return list;
            }, {});
            dispatch({errors: error});
        });
    }

    const submitHandle = (event) => {
        event.preventDefault();
        schema.isValid(state).then((valid) => {
            valid ? dispatch({isSigned: true, errors: {}}) : validate();
        });
    }
    
    const changeHandle = (event) => {
        const {name, value} = event.target;
        dispatch({ [name]: value });

    }

    return (
        <div className="container">
            <div className="col-md-12 sign-up-box">
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="title">Kanda Exam</h1>
                        </div>
                    </div>
                    <form className="sign-up-form" onSubmit={submitHandle}>
                        <div className="form-row">
                            <div className="form-group col-md-6 order-2 order-md-1">
                                <label>First Name</label>
                                <p className="error">{state.errors.firstName ? state.errors.firstName : ''} </p>
                                <div className="icon-input">
                                    <input type="text" onChange={changeHandle} name="firstName" value={state.firstName} className="form-control" />
                                    <img src="images/user.png" width="32" height="32" />
                                </div>
                            </div>
                            
                            <div className="form-group col-md-6 order-3 order-md-2">
                                <label>Last Name</label>
                                <p className="error">{state.errors.lastName ? state.errors.lastName : ''}</p>
                                <input type="text" onChange={changeHandle} name="lastName" value={state.lastName} className="form-control" />
                            </div>
                            
                            <div className="form-group col-md-12 order-1 order-md-3">
                                <label>Email</label>
                                <p className="error">{state.errors.email ? state.errors.email : ''}</p>
                                <input type="text" onChange={changeHandle} name="email" value={state.email} className="form-control" />
                            </div>
                            
                            <div className="form-group col-md-6 order-4 order-md-4">
                                <label>Password</label>
                                <p className="error">{state.errors.password ? state.errors.password : ''}</p>
                                <div className="icon-input">
                                    <input type="password" onChange={changeHandle} name="password" className="form-control" />
                                    <img src="images/password.png" />
                                </div>
                            </div>
                            
                            <div className="form-group col-md-6 order-5 order-md-5">
                                <label>Confirm Password</label>
                                <p className="error">{state.errors.confirmedPassword ? state.errors.confirmedPassword : ''}</p>
                                <div className="icon-input">
                                    <input type="password" onChange={changeHandle} name="confirmedPassword" className="form-control" />
                                    <img src="images/password.png" />
                                </div>
                            </div>
                            
                            <div className="form-group col-md-12 order-6 order-md-6">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div> 
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    );
}

export default SignupForm;