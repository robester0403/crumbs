import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import './SignUp.scss';

const SignUp = (props) => {
    let navigate=useNavigate();
    
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
            navigate(`/login`)
        })
    }

    return (
        <div className="signup__ctnr">
            <h1 className="signup__header">Sign Up</h1>
            <form onSubmit={handleSignUp} className="signup__form-ctnr">
                    <label for="name" className="signup__label">Username</label>
                    <input type="text" className="signup__input" name="name" placeholder="Enter your name"></input>
                    <label for="email" className="signup__label">Email</label>
                    <input type="text" className="signup__input" name="email" placeholder="Enter your Email Login"></input>
                    <label for="password" className="signup__label">Password</label>
                    <input type="text" className="signup__input" name="password" placeholder=""></input>
                <button type="submit" className="signup__btn">Sign Up!</button>
            </form>
            <Link to="/login" className="signup__signup-text">Log In</Link>
        </div>
    )
}

export default SignUp;
