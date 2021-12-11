import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import React, { useState } from "react";
import './LogIn.scss';


function LogIn() {
    let navigate=useNavigate();
    
    const [bloggerDetArr, setBloggerDetArr] = useState(null);

    const handleLogIn = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/users/login', {
            email: e.target.email.value,
            password: e.target.password.value
        })
        .then(res => {
            let token = res.data.token
            sessionStorage.setItem('authToken', token)
            setBloggerDetArr(res.data)
            if (token) {
                // Pass id through here 
                return navigate(`/login/blogger/${res.data.userId}`)}
        })
    }

    return (
        <>
        <div className='login__wrap'>
            <div className="login__ctnr">
                <h1 className="login__header">Log In</h1>
                <form onSubmit={handleLogIn} className="login__form-ctnr">
                        <label htmlFor="email" className="login__label">Email</label>
                        <input type="text" name="email" placeholder="Enter your Email Login" className="login__input"></input>
                        <label htmlFor="password" className="login__label">Password</label>
                        <input type="password" name="password" placeholder="" className="login__input"></input>
                    <button type="submit" className="login__btn">Log In</button>
                </form>
                <Link to="/signup" className="login__signup-text">
                    New to Crumbs? Join Now!
                </Link>
                <Link to="/" className="login__signup-text">
                    Back to front page
                </Link>
            </div>
        </div>
        </>
    )} 

export default LogIn;