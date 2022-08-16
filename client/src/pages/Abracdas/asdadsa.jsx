import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./LogIn.scss";
import { useForm } from "react-hook-form";

function LogIn() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: "Enter email here" } });
  // eslint-disable-next-line no-unused-vars
  const [bloggerDetArr, setBloggerDetArr] = useState(null);

  const submitSend = (e) => {
    axios
      .post("http://localhost:5000/api/users/login", {
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
      <div className="login__wrap">
        <div className="login__ctnr">
          <h1 className="login__header">Log In</h1>
          <form
            onSubmit={handleSubmit((e) => {
              return submitSend(e);
            })}
            className="login__form-ctnr"
          >
            <label htmlFor="email" className="login__label">
              Email
            </label>
            <input
              {...register("email", { required: "this is required" })}
              className="login__input"
            ></input>
            <div>{errors.email?.message}</div>
            <label htmlFor="password" className="login__label">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "this is required",
                minLength: {
                  value: 4,
                  message: "must be more than 4 characters",
                },
              })}
              className="login__input"
            ></input>
            <div>{errors.password?.message}</div>
            <button type="submit" className="login__btn">
              Log In
            </button>
          </form>
          <Link to="/signup" className="login__signup-text">
            New to Crumbs? Join Now!
          </Link>
          <Link to="/" className="login__signup-text">
            Back to front page
          </Link>
        </div>
      </div>
      {/* </CSSTransition> */}
    </>
  );
}

export default LogIn;
