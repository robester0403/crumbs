import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./LogIn.scss";
import { useForm } from "react-hook-form";
import { API_URL } from "../../config/config";
import styled from "styled-components";
import backgroundImg from "../../assets/images/loginsignup.png";

function LogIn() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // eslint-disable-next-line no-unused-vars
  const [bloggerDetArr, setBloggerDetArr] = useState(null);

  const submitSend = (e) => {
    axios
      .post(API_URL + "/api/users/login", {
        email: e.email,
        password: e.password,
      })
      .then((res) => {
        let token = res.data.token;
        sessionStorage.setItem("authToken", token);
        setBloggerDetArr(res.data);
        if (token) {
          // Pass id through here
          return navigate(`/login/blogger/${res.data.userId}`);
        }
      });
  };

  return (
    <>
      <MainWrapper>
        <LogInContainer>
          <LoginHeader>Log In</LoginHeader>
          <LoginFormContainer
            onSubmit={handleSubmit((e) => {
              return submitSend(e);
            })}
          >
            <LoginFormLabel htmlFor="email" className="login__label">
              Email
            </LoginFormLabel>
            <InputField
              {...register("email", { required: "this is required" })}
            />
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
            <LoginFormLabel htmlFor="password" className="login__label">
              Password
            </LoginFormLabel>
            <InputField
              type="password"
              {...register("password", {
                required: "*Email is required",
                minLength: {
                  value: 4,
                  message: "Must be more than 4 characters",
                },
              })}
              className="login__input"
            />
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
            <button type="submit" className="login__btn">
              Log In
            </button>
          </LoginFormContainer>

          <LoginSignupText>
            {"New to Crumbs? "}
            <Link to="/signup" className="login__signup-text">
              {"Join Now! "}
            </Link>
            {"Back to "}
            <Link to="/" className="login__signup-text">
              Front Page
            </Link>
          </LoginSignupText>
        </LogInContainer>
      </MainWrapper>
    </>
  );
}

export default LogIn;

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

const LogInContainer = styled.div`
  width: 26rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.92);
  border-radius: 0.5rem;
  padding: 2rem 1rem;
`;

const LoginHeader = styled.h1`
  margin-bottom: 2rem;
`;

const LoginFormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

const LoginFormLabel = styled.label`
  margin-bottom: 0.25rem;
  @include dt-bdy-copy-style;
`;

const InputField = styled.input`
  width: 24rem;
  padding: 0.4rem;
  margin-bottom: 0.5rem;
  border-radius: 0.25rem;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 0.5rem;
`;

const LoginSignupText = styled.div`
  margin-top: 1rem;
`;
