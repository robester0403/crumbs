import axios from 'axios';
import {useNavigate, useParams } from 'react-router-dom';
import './BloggerDashboard.scss';
import React, { useState, useEffect } from "react";

const BloggerDashboard = (props) => {

  let token = sessionStorage.getItem('authToken')
  const navigate=useNavigate();
  const [influencerProfileData, setInfluencerProfileData] = useState(null);
  let { userId } = useParams();
  // let [searchParams, setSearchParams] = useSearchParams();


  const onLoad = () => {
    axios.get(`http://localhost:5000/api/users/loggedin/${userId}`, {headers: { 'Authorization': `Bearer ${token}`}})
    .then(res =>  
      setInfluencerProfileData(res.data.influencerProfile)
    )
    console.log(influencerProfileData)
    console.log(token)
    
  }
  useEffect(() => {
    onLoad();
    }
    , [])

  const handleLogOut = (e) => {
    e.preventDefault();

    sessionStorage.removeItem('authToken')
    navigate('/login')
  }

    return (
      <>
      {/* Just need some async logic to load  */}
      <div>Welcome</div>
      <button onClick={handleLogOut}>Logout</button>
      </>
    )
}

export default BloggerDashboard;