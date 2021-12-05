import axios from 'axios';
import {useNavigate, useParams } from 'react-router-dom';
import './BloggerDashboard.scss';
import React, { useState, useEffect } from "react";

const BloggerDashboard = (props) => {

  let token = sessionStorage.getItem('authToken')
  const navigate=useNavigate();
  const [influencerProfileData, setInfluencerProfileData] = useState(null);
  const [yelpSearchData, setYelpSearchData] = useState(null);
// use params give you access to URL params on the http address
  let { userId } = useParams();

  const onLoad = async () => {
    await axios.get(`http://localhost:5000/api/users/loggedin/${userId}`, {headers: { 'Authorization': `Bearer ${token}`}})
    .then(res =>  
      setInfluencerProfileData(res.data.influencerProfile)
      // console.log(res.data.influencerProfile)
    )
    console.log(influencerProfileData)
    console.log(token)
  }

  const handleYelpSearch = (e) => {
    e.preventDefault();
    console.log(`http://localhost:5000/api/users/loggedin/${userId}/searchYelp`);
    axios.post(`http://localhost:5000/api/users/loggedin/${userId}/searchYelp`, 
      {
        term: e.target.searchbizname.value,
        location: e.target.searchbizaddresscity.value
      }
    ,
      {
        headers: { 'Authorization': `Bearer ${token}`}
      }
    )
    .then(res =>  
YelpSearchData(res.data.yelpresult.businesses[0])
    )
  }

  const handleAddMarkerInstance = (e) => {
    e.preventDefault();
    console.log(`http://localhost:5000/api/users/loggedin/${userId}/searchYelp`);
    axios.post(`http://localhost:5000/api/users/loggedin/${userId}/searchYelp`, 
      {
        bizId: yelpSearchData.bizId,
        bizName: yelpSearchData.bizName,
        imageUrl: yelpSearchData.imageurl,
        address1: yelpSearchData.address1,
        address2: yelpSearchData.address2,
        address3: yelpSearchData.address3,
        city: yelpSearchData.city,
        country: yelpSearchData.country,
        state: yelpSearchData.state,
        phone: yelpSearchData.phone,
        latitude: yelpSearchData.latitude,
        longitude: yelpSearchData.longitude,
        userId: influencerProfileData.userId,
        name: influencerProfileData.name,
        mediaLinkUrl: e.target.medialink.value
      }
    ,
      {
        headers: { 'Authorization': `Bearer ${token}`}
      }
    )
    .then( 
      console.log('marker set up')
    )
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

  if (!influencerProfileData ) {
    return(
    <div>loading...</div>)
  } else {
    return (
      <>
      {/* Just need some async logic to load  */}
      <div>Welcome {influencerProfileData.name}</div>

      <button onClick={handleLogOut}>Logout</button>

      <form onSubmit={handleYelpSearch}>
          <label for="searchbizname">Business Name</label>
          <input type="text" name="searchbizname" placeholder="Enter the business name"></input>
          <label for="searchbizaddresscity">Address or City</label>
          <input type="text" name="searchbizaddresscity" placeholder="Enter your address or a city"></input>
        <button type="submit">Search Yelp</button>
      </form>

      <form onSubmit={handleAddMarkerInstance}>
          <label for="medialink">Media Link: Share with Time You Want to Start At</label>
          <input type="text" name="medialink" placeholder="Youtube link"></input>
          <label for="description">Description (Not Required Implemented Later)</label>
          <input type="text" name="description" placeholder="Enter whatever you would like to add"></input>
        <button type="submit">Search Yelp</button>
      </form>
      {/* mediaLinkUrl,
      mediaEmbed */}

            {/* <form onSubmit={handleSignUp}>
                    <label for="name">Username</label>
                    <input type="text" name="name" placeholder="Enter your name"></input>
                    <label for="email">Email</label>
                    <input type="text" name="email" placeholder="Enter your Email Login"></input>
                    <label for="password">Password</label>
                    <input type="text" name="password" placeholder=""></input>
                <button type="submit">Sign Up!</button>
            </form>  */}
      </>
    )}
}

export default BloggerDashboard;