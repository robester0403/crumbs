import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import BloggerDashboard from '../../protectedcomponents/BloggerDashboard/BloggerDashboard';
import React, { useState } from "react";
import './LogIn.scss';


function LogIn(props) {
    let token = sessionStorage.getItem('authToken')
    let navigate=useNavigate();
    
    const [bloggerDetArr, setBloggerDetArr] = useState(null);

    const handleLogIn = (e) => {
        e.preventDefault();

        // Delete after
        console.log({
            email: e.target.email.value,
            password: e.target.password.value
        })

        axios.post('http://localhost:5000/api/users/login', {
            email: e.target.email.value,
            password: e.target.password.value
        })
        .then(res => {
            console.log(res)
            let token = res.data.token
            console.log(token)
            sessionStorage.setItem('authToken', token)
            setBloggerDetArr(res.data)
            console.log(bloggerDetArr)
            console.log(res.data.influencerId)
            if (token) {
                // Pass id through here 
                return navigate(`/login/blogger/${res.data.influencerId}`)}
        })
    }


    return (
        <div className="login">
            <h1>Log In</h1>
            <form onSubmit={handleLogIn}>
                    <label for="email">Email</label>
                    <input type="text" name="email" placeholder="Enter your Email Login"></input>
                    <label for="password">Password</label>
                    <input type="text" name="password" placeholder=""></input>
                <button type="submit">Log In</button>
            </form>
            <Link to="/signup">Sign Up</Link>
        </div>
    )} 
    // This may be more optimized to use less Axios and less resources


export default LogIn;