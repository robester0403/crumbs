import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config/config";
import backgroundImg from "../../assets/images/loginsignup.png";
import styled from "styled-components";

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
      <MainWrapper>
        <SignupContainer>
          <SignupHeader>Sign Up</SignupHeader>
          <SignupForm onSubmit={handleSignUp}>
            <FormLabel htmlFor="name">Username</FormLabel>
            <FormInput type="text" name="name" placeholder="Enter your name" />
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormInput
              type="text"
              name="email"
              placeholder="Enter your Email Login"
            />
            <FormLabel htmlFor="password">Password</FormLabel>
            <FormInput type="password" name="password" placeholder="" />
            <button type="submit" className="signup__btn">
              Sign Up!
            </button>
          </SignupForm>
          <Link to="/login" className="signup__signup-text">
            Already an Influencer? Log in here instead
          </Link>
        </SignupContainer>
      </MainWrapper>
    </>
  );
};

export default SignUp;

const MainWrapper = styled.div`
  margin: 0 auto;
  width: 64rem;
  height: 60rem;
  background-image: url(${backgroundImg});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignupContainer = styled.div`
  width: 26rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.92);
  border-radius: 0.5rem;
  padding: 2rem 1rem;
`;

const SignupHeader = styled.h1`
  margin-bottom: 1.5rem;
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const FormLabel = styled.label`
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 400;
`;

const FormInput = styled.input`
  width: 24rem;
  padding: 0.4rem;
  margin-bottom: 1rem;
  border-radius: 0.25rem;
  box-shadow: none;
`;
