import axios from 'axios';
import {Link} from 'react-router-dom';
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
                    <label for="name">Username</label>
                    <input type="text" name="name" placeholder="Enter your name"></input>
                    <label for="email">Email</label>
                    <input type="text" name="email" placeholder="Enter your Email Login"></input>
                    <label for="password">Password</label>
                    <input type="text" name="password" placeholder=""></input>
                <button type="submit">Sign Up!</button>
            </form>
            <Link to="/login">Log In</Link>
        </div>
    )
}

export default SignUp;
