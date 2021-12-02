import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './BloggerDashboard.scss';
import React, { useState, useEffect } from "react";

const BloggerDashboard = (props) => {

  let navigate=useNavigate();
  console.log(props)
  const onLoad = () => {
    let token = sessionStorage.getItem('authToken')
    console.log(token)
  }

  useEffect(() => {
    onLoad();
    }
    , [])

  // const onLoad()

  const handleLogOut = (e) => {
    e.preventDefault();

    sessionStorage.removeItem('authToken')
    navigate('/login')
  }


    return (
      <>
      <button onClick={handleLogOut}></button>
      </>
    )
}

export default BloggerDashboard;