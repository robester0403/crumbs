import axios from 'axios';
import React from 'react'
import {Link} from 'react-router-dom';
import Input from '../../components/Input/Input'
import './SignUp.scss';

const SignUp = (props) => {

    const handleSignUp = (e) => {
        e.preventDefault();
        console.log({
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value
        })

        axios.post('http://localhost:5000/api/users/signup', {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value
        })
        .then(res => {
            console.log(res)
            props.history.push('/login')
        })
    }

    return (
        <div className="">
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUp}>
                <Input label="Name" name="name" type="text" />
                <Input label="Username" name="email" type="text" />
                <Input label="Password" name="password" type="password" />

                <button type="submit">Sign Up!</button>
            </form>
            <Link to="/login">Log In</Link>
        </div>
    )
}

export default SignUp;
