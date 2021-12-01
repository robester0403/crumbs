import axios from 'axios';
import React from 'react'
import {Link} from 'react-router-dom';
import Input from '../../components/Input/Input';


function LogIn(props) {

    const handleLogIn = (e) => {
        e.preventDefault();
        console.log({
            username: e.target.username.value,
            password: e.target.password.value
        })

        axios.post('http://localhost:8080/users/login', {
            username: e.target.username.value,
            password: e.target.password.value
        })
        .then(res => {
            console.log(res)
            let token = res.data.token
            sessionStorage.setItem('authToken', token)
            props.history.push('/')
        })
    }

    return (
        <div className="login">
            <h1>Log In</h1>
            <form onSubmit={handleLogIn}>
                <Input label="Username" name="username" type="text" />
                <Input label="Password" name="password" type="password" />
                <button type="submit">Log In</button>
            </form>
            <Link to="/signup">Sign Up</Link>
        </div>
    )
}

export default LogIn;