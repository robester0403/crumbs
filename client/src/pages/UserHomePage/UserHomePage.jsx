import './UserHomePage.scss';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import React, {useState} from "react";
import ReactMapGL, {Marker, Popup} from "react-map-gl";
import * as stationData from "../../assets/data/stations.json"
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.JPG";
import icon from "../../assets/images/station-icon.png";


const UserHomePage = () => {

  const [viewport, setViewport] = useState({
    latitude: 39.0111458605,
    longitude: -76.9110575000,
    zoom: 10
  });
  const [selectedStation, setSelectedStation] = useState(null);

  return (
    <>
      <main className="userHomePage">
      <Header/>

        <section className="userHomePage__map-ctnr" id="map">
          <ReactMapGL
          onViewportChange={(newView) => setViewport(newView)}
          mapboxApiAccessToken={"pk.eyJ1Ijoicm9iZXN0ZXIwNDAzIiwiYSI6ImNrd2loN204ZTE4OGMyc280OHUxNzRpa3EifQ.m2pjCyZdJVLQmPEgO1EJ9w"}
          {...viewport}
          mapStyle="mapbox://styles/robester0403/ckwiiyulp1tc914kz01i19hh3"
          container="map"
          >
            {stationData.features.map((station) => (
              <Marker key={station.properties.address}
              latitude={station.geometry.coordinates[1]}
              longitude={station.geometry.coordinates[0]}
              >
                <button className="marker-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedStation(station);
                  }
                }>
                  <img className="marker-btn-img" src={icon} alt="station marker"/>
                </button>
              </Marker>
            ))
            
            };
            {selectedStation ? (
              <Popup
              latitude={selectedStation.geometry.coordinates[1]}
              longitude={selectedStation.geometry.coordinates[0]}
              onClose={() => {setSelectedStation(null)}}>
                <div>
                  {selectedStation.properties.description}
                </div>
                <div>
                  {selectedStation.properties.address}
                </div>
                <div>
                  <a href={`${selectedStation.properties.url}`}>
                    Link to Station
                  </a>
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