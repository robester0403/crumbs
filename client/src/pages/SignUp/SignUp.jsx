import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config/config";
import "./SignUp.scss";

const SignUp = () => {
  let navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    axios
      .post(API_URL + "/api/users/signup", {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
      })
      .then((res) => {
        navigate(`/login`);
      });
  };

  return (
    <>
      <main className="signup__wrap">
        <div className="signup__ctnr">
          <h1 className="signup__header">Sign Up</h1>
          <form onSubmit={handleSignUp} className="signup__form-ctnr">
            <label htmlFor="name" className="signup__label">
              Username
            </label>
            <input
              type="text"
              className="signup__input"
              name="name"
              placeholder="Enter your name"
            ></input>
            <label htmlFor="email" className="signup__label">
              Email
            </label>
            <input
              type="text"
              className="signup__input"
              name="email"
              placeholder="Enter your Email Login"
            ></input>
            <label htmlFor="password" className="signup__label">
              Password
            </label>
            <input
              type="password"
              className="signup__input"
              name="password"
              placeholder=""
            ></input>
            <button type="submit" className="signup__btn">
              Sign Up!
            </button>
          </form>
          <Link to="/login" className="signup__signup-text">
            Already an Influencer? Log in here instead
          </Link>
        </div>
      </main>
    </>
  );
};

export default SignUp;
