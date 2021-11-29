import './UserHomePage.scss';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import React, { useState, useEffect } from "react";
import ReactMapGL, {Marker, Popup} from "react-map-gl";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.JPG";
import icon from "../../assets/images/food-icon.png";
import axios from 'axios';


const UserHomePage = () => {

  const [restaurantsArr, setRestaurantsArr] = useState(0);

  const [viewport, setViewport] = useState({
    latitude: 43.65845826670497,
    longitude: -79.385555,
    width: "80vw",
    height: "60vh",
    zoom: 12
  });

  const onLoad = () => {
    axios.get(`http://localhost:8080/api/v1/users/`)
    .then(res => {
      setRestaurantsArr(res.data)
    })
    .catch(error => console.log(error))
    console.log(restaurantsArr)
  }

  useEffect(() => {
    onLoad();
    }
    , [])

  useEffect(() => {
      {restaurantsArr[0] ?
      console.log(restaurantsArr): console.log(restaurantsArr)}
      }
      , [restaurantsArr])

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  return (
    <>
      <main className="userHomePage">
      <Header/>
        <section className="userHomePage__map-ctnr">
          <ReactMapGL
          onViewportChange={(newView) => setViewport(newView)}
          mapboxApiAccessToken={"pk.eyJ1Ijoicm9iZXN0ZXIwNDAzIiwiYSI6ImNrd2loN204ZTE4OGMyc280OHUxNzRpa3EifQ.m2pjCyZdJVLQmPEgO1EJ9w"}
          {...viewport}
          mapStyle="mapbox://styles/robester0403/ckwiiyulp1tc914kz01i19hh3"
          >
            {restaurantsArr && restaurantsArr.map((restaurant) => (
              <Marker key={restaurant.id}
              latitude={restaurant.coordinates.latitude}
              longitude={restaurant.coordinates.longitude}
              >
                <button className="marker-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedRestaurant(restaurant);
                  }
                }>
                  <img className="marker-btn-img" src={icon} alt="station marker"/>
                </button>
              </Marker>
            ))
            };
            {selectedRestaurant ? (
              <Popup
              latitude={selectedRestaurant.coordinates.latitude}
              longitude={selectedRestaurant.coordinates.longitude}
              onClose={() => {setSelectedRestaurant(null)}}>
                <div>
                  {selectedRestaurant.name}
                </div>
                <div>
                  <img className="popup-img" src={selectedRestaurant.image_url} />
                </div>
              </Popup>
            ): null}
          </ReactMapGL>

        </section>
        <div>
        What comes after
        </div>
      <Footer/>
      </main>
    </>
  )
}

export default UserHomePage;


// import './UserHomePage.scss';
// import Header from "../../components/Header/Header";
// import Footer from "../../components/Footer/Footer";
// import React, {useState} from "react";
// import ReactMapGL, {Marker, Popup} from "react-map-gl";
// import * as stationData from "../../assets/data/stations.json"
// import { Link } from "react-router-dom";
// import logo from "../../assets/images/logo.JPG";
// import icon from "../../assets/images/station-icon.png";


// const UserHomePage = () => {

//   const [viewport, setViewport] = useState({
//     latitude: 39.0111458605,
//     longitude: -76.9110575000,
//     width: "80vw",
//     height: "60vh",
//     zoom: 10
//   });
//   const [selectedStation, setSelectedStation] = useState(null);

//   return (
//     <>
//       <main className="userHomePage">
//       <Header/>

//         <section className="userHomePage__map-ctnr">
//           <ReactMapGL
//           onViewportChange={(newView) => setViewport(newView)}
//           mapboxApiAccessToken={"pk.eyJ1Ijoicm9iZXN0ZXIwNDAzIiwiYSI6ImNrd2loN204ZTE4OGMyc280OHUxNzRpa3EifQ.m2pjCyZdJVLQmPEgO1EJ9w"}
//           {...viewport}
//           mapStyle="mapbox://styles/robester0403/ckwiiyulp1tc914kz01i19hh3"
//           >
//             {stationData.features.map((station) => (
//               <Marker key={station.properties.address}
//               latitude={station.geometry.coordinates[1]}
//               longitude={station.geometry.coordinates[0]}
//               >
//                 <button className="marker-btn"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setSelectedStation(station);
//                   }
//                 }>
//                   <img className="marker-btn-img" src={icon} alt="station marker"/>
//                 </button>
//               </Marker>
//             ))
            
//             };
//             {selectedStation ? (
//               <Popup
//               latitude={selectedStation.geometry.coordinates[1]}
//               longitude={selectedStation.geometry.coordinates[0]}
//               onClose={() => {setSelectedStation(null)}}>
//                 <div>
//                   {selectedStation.properties.description}
//                 </div>
//                 <div>
//                   {selectedStation.properties.address}
//                 </div>
//                 <div>
//                   <a href={`${selectedStation.properties.url}`}>
//                     Link to Station
//                   </a>
//                 </div>
//               </Popup>
//             ): null}
//           </ReactMapGL>
//         </section>
//         <div>
//         What comes after
//         </div>
//       <Footer/>
//       </main>
//     </>
//   )
// }

// export default UserHomePage;