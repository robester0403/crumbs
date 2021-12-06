import axios from 'axios';
import {useNavigate, useParams } from 'react-router-dom';
import './BloggerDashboard.scss';
import React, { useState, useEffect } from "react";

const BloggerDashboard = () => {

  let token = sessionStorage.getItem('authToken')
  const navigate=useNavigate();
  const [influencerProfileData, setInfluencerProfileData] = useState(null);
  const [yelpSearchData, setYelpSearchData] = useState(null);
// use params give you access to URL params on the http address. the params being the same in the URL
  let { userId } = useParams();

  const onLoad = async () => {
    await axios.get(`http://localhost:5000/api/users/loggedin/${userId}`, {headers: { 'Authorization': `Bearer ${token}`}})
    .then(res =>  
      setInfluencerProfileData(res.data.influencerProfile)
    )
  }

  const handleYelpSearch = async (e) => {
    e.preventDefault();
    console.log(`http://localhost:5000/api/users/loggedin/${userId}/searchYelp`);
    await axios.post(`http://localhost:5000/api/users/loggedin/${userId}/searchYelp`, 
      {
        term: e.target.searchbizname.value,
        location: e.target.searchbizaddresscity.value
      }
    ,
      { headers: { 'Authorization': `Bearer ${token}`} }
    )
    .then(res =>  
      setYelpSearchData(res.data)
    )
    console.log(yelpSearchData)
  }

  const handleAddMarkerInstance = (e) => {
    e.preventDefault();
    console.log(`http://localhost:5000/api/users/loggedin/${userId}/addmarkinst`);
    axios.post(`http://localhost:5000/api/users/loggedin/${userId}/addmarkinst`, 
      {
        bizId: yelpSearchData.bizId,
        bizName: yelpSearchData.bizName,
        imageUrl: yelpSearchData.imageUrl,
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
        mediaLinkUrl: e.target.medialink.value,
        price: yelpSearchData.price,
        rating: yelpSearchData.rating,
        url: yelpSearchData.url,
        reviewCount: yelpSearchData.review_count
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
      
      {/* header block for influencers. May make into header later */}
        <section>
          <h1>
          Welcome {influencerProfileData.name}
          </h1>
          <h3>
            Email: {influencerProfileData.email}
          </h3>
          <button onClick={handleLogOut}>
            Logout
          </button>
        </section>

      {/* Body Section */}

        <main>
          {/* Aside Menu navigation */}
          <aside>
            <div>
              Post Content
            </div>
            <div>
              Edit/Delete Content
            </div>
            <div>
              Leaderboard
            </div>
            <div>
              Influencer Forums
            </div>
            <div>
              Settings
            </div>
          </aside>  
          {/* should display flex from here */}
          <section>
            {/* Can be condensed into a Yelp Component */}
            <article>
              <h1>
                Create a new CrumbTrail!
              </h1>
              <h3>
                Step 1: Search Yelp For Your Store
              </h3>
              <h4>
                If the exact store is not located, then try adding more information.
              </h4>
                <form onSubmit={handleYelpSearch}>
                    <label for="searchbizname">Business Name</label>
                    <input type="text" name="searchbizname" placeholder="Enter the business name"></input>
                    <label for="searchbizaddresscity">Address or City</label>
                    <input type="text" name="searchbizaddresscity" placeholder="Enter your address or a city"></input>
                  <button type="submit">Search Yelp</button>
                </form>
                <div className="makeacardhere">
                  {/* In the future add be the first to post here logic */}
                  <h3>
                    Yelp Search Results
                  </h3>
                  <h4>
                    Location Name: {yelpSearchData.bizName}
                  </h4>
                  <h4>
                    Address: {yelpSearchData.address1} {yelpSearchData.address2} {yelpSearchData.address3}
                  </h4>
                  <h4>
                    City: {yelpSearchData.city}
                  </h4>
                  <h4>
                    State or Province: {yelpSearchData.state}
                  </h4>
              </div>
            </article>

            

            {/* Can be condensed into a MarkInst Component */}
            <article>
              <h1>
                Step 2:Share Your Media
              </h1>
              <form onSubmit={handleAddMarkerInstance}>
                  <label for="medialink">Media Link: Share with Time You Want to Start At</label>
                  <input type="text" name="medialink" placeholder="Youtube link"></input>
                  <label for="description">Description (Implemented Later)</label>
                  <input type="text" name="description" placeholder=""></input>
                <button type="submit">Create CrumbTrail</button>
              </form>
              <h4>
                See below for a quick tutorial on how to share youtube links.
              </h4>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/IzzNgzn2ppk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </article>
          </section>

        </main>
        <main>
          {/* Map out blogger instances here. */}

        </main>

      </>
    )}
}

export default BloggerDashboard;