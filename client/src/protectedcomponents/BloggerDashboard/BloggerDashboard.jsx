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
    // run your axios.get influencers here
  }

  useEffect(() => {
    onLoad();
    }
    , [])

// we gonna use onload to get the collecton of userdata from the collection

  const handleLogOut = (e) => {
    e.preventDefault();

    sessionStorage.removeItem('authToken')
    navigate('/login')
  }


    return (
      <>
      <button onClick={handleLogOut}>Logout</button>
      </>
    )
}

export default BloggerDashboard;