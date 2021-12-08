import axios from 'axios';
import {useNavigate, useParams } from 'react-router-dom';
import BloggerInstanceCards from '../../protectedcomponents/BloggerInstanceCards/BloggerInstanceCards';
import './BloggerDashboard.scss';
import React, { useState, useEffect } from "react";

const BloggerDashboard = () => {

  let token = sessionStorage.getItem('authToken')
  const navigate=useNavigate();
  const [influencerOwnInst, setInfluencerOwnInst] = useState(null);
  const [influencerProfileData, setInfluencerProfileData] = useState(null);
  const [yelpSearchData, setYelpSearchData] = useState(null);
// use params give you access to URL params on the http address. the params being the same in the URL
  let { userId } = useParams();

  const onLoadProfile = async () => {
    await axios.get(`http://localhost:5000/api/users/loggedin/${userId}/profile`, {headers: { 'Authorization': `Bearer ${token}`}})
    .then(res =>  
      setInfluencerProfileData(res.data.profileData)
    )
  }

  const onLoadInstances = async () => {
    await axios.get(`http://localhost:5000/api/users/loggedin/${userId}`, {headers: { 'Authorization': `Bearer ${token}`}})
    .then(res =>  
      setInfluencerOwnInst(res.data.instances)
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
    let fixUrl = e.target.medialink.value.replace("youtu.be","www.youtube.com/embed");
    let mediaLinkUrl = fixUrl + "?start=" + e.target.starttime.value
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
        mediaLinkUrl: mediaLinkUrl,
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
    onLoadInstances();
    onLoadProfile();
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

        <main>
                {/* Body Section */}
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
                  {/* Maybe make entire section conditional */}
                  <h3>
                    Yelp Search Results
                  </h3>
                  <h4>
                    Location Name: {yelpSearchData && yelpSearchData.bizName}
                  </h4>
                  <h4>
                    Address: {yelpSearchData && yelpSearchData.address1} {yelpSearchData && yelpSearchData.address2} {yelpSearchData && yelpSearchData.address3}
                  </h4>
                  <h4>
                    City: {yelpSearchData && yelpSearchData.city}
                  </h4>
                  <h4>
                    State or Province: {yelpSearchData && yelpSearchData.state}
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
                  <label for="starttime">Time to Start Vid In Seconds </label>
                  <input type="text" name="starttime" placeholder="Enter An Integer"></input>
                <button type="submit">Create CrumbTrail</button>
              </form>
              <h4>
              </h4>
            </article>
            <article>
              
            </article>
          </section>
        </main>
        <main>
        {influencerOwnInst && influencerOwnInst.map(instance => <BloggerInstanceCards
          renderInstance={instance}
        />)}
        </main>


      </>
    )}
}

export default BloggerDashboard;