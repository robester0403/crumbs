// import axios from 'axios';
// import {useNavigate, useParams } from 'react-router-dom';
// import './BloggerEditProfile.scss';
// import React, { useState, useEffect } from "react";

// const BloggerEditProfile = () => {

//   let token = sessionStorage.getItem('authToken')
//   const navigate = useNavigate();
//   let { userId } = useParams();

//   // const handleYelpSearch = async (e) => {
//   //   e.preventDefault();
//   //   await axios.post(`http://localhost:5000/api/users/loggedin/${userId}/searchYelp`, 
//   //     {
//   //       term: e.target.searchbizname.value,
//   //       location: e.target.searchbizaddresscity.value
//   //     }
//   //   ,
//   //     { headers: { 'Authorization': `Bearer ${token}`} }
//   //   )
//   //   .then(res =>  
//   //     setYelpSearchData(res.data)
//   //   )
//   // }


//   // const handleAddMarkerInstance = (e) => {
//   //   e.preventDefault();
//   //   let fixUrl = e.target.medialink.value.replace("youtu.be","www.youtube.com/embed");
//   //   let mediaLinkUrl = fixUrl + "?start=" + e.target.starttime.value
//   //   axios.post(`http://localhost:5000/api/users/loggedin/${userId}/addmarkinst`, 
//   //     {
//   //       bizId: yelpSearchData.bizId,
//   //       bizName: yelpSearchData.bizName,
//   //       imageUrl: yelpSearchData.imageUrl,
//   //       address1: yelpSearchData.address1,
//   //       address2: yelpSearchData.address2,
//   //       address3: yelpSearchData.address3,
//   //       city: yelpSearchData.city,
//   //       country: yelpSearchData.country,
//   //       state: yelpSearchData.state,
//   //       phone: yelpSearchData.phone,
//   //       latitude: yelpSearchData.latitude,
//   //       longitude: yelpSearchData.longitude,
//   //       userId: influencerProfileData.userId,
//   //       name: influencerProfileData.name,
//   //       mediaLinkUrl: mediaLinkUrl,
//   //       price: yelpSearchData.price,
//   //       rating: yelpSearchData.rating,
//   //       url: yelpSearchData.url,
//   //       reviewCount: yelpSearchData.review_count
//   //     }
//   //   ,
//   //     {
//   //       headers: { 'Authorization': `Bearer ${token}`}
//   //     }
//   //   )
//   //   .then( 
//   //     window.location.reload(false)
//   //   )
//   // }

//   useEffect(() => {
//     axios.get(`http://localhost:5000/api/users/loggedin/${userId}/profile`, {headers: { 'Authorization': `Bearer ${token}`}})
//     .then(res =>  
//       setInfluencerProfileData(res.data.profileData)
//     )
//     }
//     , [token, userId])

//   const handleLogOut = (e) => {
//     e.preventDefault();
//     sessionStorage.removeItem('authToken')
//     navigate('/login')
//   }

//   if (!influencerProfileData ) {
//       return(
//       <div>loading...</div>)
//     } else {
//     return (
//       <>
//         <main>
//         </main>
//       </>
//     )
//   }
// }

// export default BloggerEditProfile;