import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BloggerInstanceCards from "../../protectedcomponents/BloggerInstanceCards/BloggerInstanceCards";
import "./BloggerDashboard.scss";
import React, { useState, useEffect } from "react";
import { API_URL } from "../../config/config";

const BloggerDashboard = () => {
  let token = sessionStorage.getItem("authToken");
  const navigate = useNavigate();
  const [influencerOwnInst, setInfluencerOwnInst] = useState(null);
  const [influencerProfileData, setInfluencerProfileData] = useState(null);
  const [yelpSearchData, setYelpSearchData] = useState(null);
  let { userId } = useParams();

  const handleYelpSearch = (e) => {
    e.preventDefault();
    axios
      .post(
        API_URL + `/api/users/loggedin/${userId}/searchYelp`,
        {
          term: e.target.searchbizname.value,
          location: e.target.searchbizaddresscity.value,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => setYelpSearchData(res.data))
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddMarkerInstance = (e) => {
    e.preventDefault();
    let fixUrl = e.target.medialink.value.replace(
      "youtu.be",
      "www.youtube.com/embed"
    );
    let mediaLinkUrl = fixUrl + "?start=" + e.target.starttime.value;
    axios
      .post(
        API_URL + `/api/users/loggedin/${userId}/addmarkinst`,
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
          reviewCount: yelpSearchData.review_count,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(window.location.reload(false));
  };

  useEffect(() => {
    axios
      .get(API_URL + `/api/users/loggedin/${userId}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setInfluencerProfileData(res.data.profileData));
    axios
      .get(API_URL + `/api/users/loggedin/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setInfluencerOwnInst(res.data.instances));
    // see if this works
    return () => {
      axios
        .get(API_URL + `/api/users/loggedin/${userId}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setInfluencerProfileData(res.data.profileData));
      axios
        .get(API_URL + `/api/users/loggedin/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setInfluencerOwnInst(res.data.instances));
    };
  }, [token, userId]);

  const handleLogOut = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("authToken");
    navigate("/login");
  };

  if (!influencerProfileData) {
    return <div>loading...</div>;
  } else {
    return (
      <>
        <main className="nav-bar">
          <section className="nav-bar__profile-ctnr">
            <h1 className="">Welcome {influencerProfileData.name}</h1>
            <h3 className="">Email: {influencerProfileData.email}</h3>
            <button className="nav-bar__logout-btn" onClick={handleLogOut}>
              Logout
            </button>
          </section>
        </main>
        <main className="dashboard">
          <div className="dashboard__forms-ctnr">
            <article className="dashboard__yelp-ctnr">
              <h1 className="dashboard__subheading">
                Create a new CrumbTrail!
              </h1>
              <h3 className="dashboard__subheading">
                Step 1: Search Yelp For Your Store
              </h3>
              <h4 className="dashboard__subheading">
                If the exact store is not located, then try adding more
                information.
              </h4>
              <form onSubmit={handleYelpSearch} className="dashboard__form">
                <label className="dashboard__form-lbl" for="searchbizname">
                  Business Name
                </label>
                <input
                  className="dashboard__form-input"
                  type="text"
                  name="searchbizname"
                  placeholder="Enter the business name"
                ></input>
                <label
                  className="dashboard__form-lbl"
                  for="searchbizaddresscity"
                >
                  Address or City
                </label>
                <input
                  className="dashboard__form-input"
                  type="text"
                  name="searchbizaddresscity"
                  placeholder="Enter your address or a city"
                ></input>
                <button className="dashboard__form-submit" type="submit">
                  Search Yelp
                </button>
              </form>
              <div className="dashboard__subheading">
                <h3 className="dashboard__subheading">Yelp Search Results</h3>
                <h4 className="dashboard__search-results">
                  Location Name: {yelpSearchData && yelpSearchData.bizName}
                </h4>
                <h4 className="dashboard__search-results">
                  Address: {yelpSearchData && yelpSearchData.address1}{" "}
                  {yelpSearchData && yelpSearchData.address2}{" "}
                  {yelpSearchData && yelpSearchData.address3}
                </h4>
                <h4 className="dashboard__search-results">
                  City: {yelpSearchData && yelpSearchData.city}
                </h4>
                <h4 className="dashboard__search-results">
                  State or Province: {yelpSearchData && yelpSearchData.state}
                </h4>
              </div>
            </article>
            <article className="dashboard__media-ctnr">
              <h1 className="dashboard__subheading">
                Step 2: Share Your Media
              </h1>
              <form
                className="dashboard__form"
                onSubmit={handleAddMarkerInstance}
              >
                <label className="dashboard__form-lbl" for="medialink">
                  Media Link: Share with Time You Want to Start At
                </label>
                <input
                  className="dashboard__form-input"
                  type="text"
                  name="medialink"
                  placeholder="Youtube link"
                ></input>
                <label className="dashboard__form-lbl" for="starttime">
                  Time to Start Vid In Seconds{" "}
                </label>
                <input
                  className="dashboard__form-input"
                  type="text"
                  name="starttime"
                  placeholder="Enter An Integer"
                ></input>
                <button className="dashboard__form-submit" type="submit">
                  Create CrumbTrail
                </button>
              </form>
            </article>
          </div>
          <article className="dashboard__instance-ctnr">
            {influencerOwnInst &&
              influencerOwnInst.map((instance) => (
                <BloggerInstanceCards
                  key={instance.id}
                  renderInstance={instance}
                />
              ))}
          </article>
        </main>
      </>
    );
  }
};

export default BloggerDashboard;
