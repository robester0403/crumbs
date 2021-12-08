import './UserHomePage.scss';
import Header from "../../components/Header/Header";
import MapInstanceCards from '../../components/MapInstanceCards/MapInstanceCards';
import Footer from "../../components/Footer/Footer";
import React, { useState, useEffect } from "react";
import ReactMapGL, {Marker, Popup} from "react-map-gl";
import mapmarker from "../../assets/images/food-icon.png";
import axios from 'axios';


const UserHomePage = () => {
  
  // Restaurant array is the marker array for now
  const [markerArr, setMarkerArr] = useState(null);
  const [instancesArr, setInstancesArr] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedInstancesArr, setSelectedInstancesArr] = useState(null);
  // selectedVideo is set in the cards
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 43.65845826670497,
    longitude: -79.385555,
    width: "64rem",
    height: "50vh",
    zoom: 12
  });
  
  
  const onLoadMarker = async () => {
    // redo this link
    await axios.get(`http://localhost:5000/api/instancemap/marker/all`)
    .then(res => {
      setMarkerArr(res.data.markers)
    })
    // .catch(error => console.log(error))
  }

  const onLoadInstance = async () => {
    // redo this link
    await axios.get(`http://localhost:5000/api/instancemap/inst/all`)
    .then(res => {
      setInstancesArr(res.data.instances)
    })
    .catch(error => console.log(error))
  }

  const targetInstanceSetter = async (targetBizId) => {

    await axios.get(`http://localhost:5000/api/instancemap/inst/${targetBizId}`)
    .then(res=> {
      console.log(res.data.instances)
      setSelectedInstancesArr(res.data.instances)

    })
    .catch(error => console.log(error))
  }

  useEffect(() => {
    onLoadMarker();
    onLoadInstance();
    }
    , [])

    useEffect(() => {
      onLoadMarker();
      onLoadInstance()
      }
      , [viewport.width])
  // useEffect(() => {
  //       console.log(parseFloat(markerArr[0].latitude.$numberDecimal))
  //     }
  //     , [markerArr])

  // the below will overwrite just the width
  // useEffect(() => {
  //   setViewport({...viewport, width: window.innerWidth});
  //   }
  //   , [window.innerWidth])
  
  return (
    <>
      <div className="userHomePage__wrap">
        <main >
        <Header/>
          <section className="userHomePage__map-ctnr">
            <ReactMapGL
            onViewportChange={(newView) => setViewport(newView)}
            // move this to env later
            mapboxApiAccessToken={"pk.eyJ1Ijoicm9iZXN0ZXIwNDAzIiwiYSI6ImNrd2loN204ZTE4OGMyc280OHUxNzRpa3EifQ.m2pjCyZdJVLQmPEgO1EJ9w"}
            {...viewport}
            mapStyle="mapbox://styles/robester0403/ckwiiyulp1tc914kz01i19hh3"
            >
              {/* !1! you click on the map */}
              {/* the arr exists. The map  is mapping undefined, meaning the data is not there the right way? because it is mapping 4 entries */}
              {markerArr && markerArr.map((marker) => (
                <>
                  <Marker 
                  key={ marker.id }
                  latitude= {parseFloat(marker.latitude.$numberDecimal)}
                  longitude={parseFloat(marker.longitude.$numberDecimal)}
                  offsetTop={-viewport.zoom * 5}
                  offsetLeft={-viewport.zoom*2.6}
                  >
                    {/* !2! onClick sets the marker for popup and instances */}
                    <button className="marker-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedMarker(marker);
                      // This is the logic for the set setSelectedInstancesArr function we need all the instances with that go with this instance so we are going to need to call it axios
                      targetInstanceSetter(marker.bizId)
                      }
                    }>
                      <img width={viewport.zoom*3.5} height={viewport.zoom*3.5} src={mapmarker} alt="station marker"/>
                    </button>
                  </Marker>
                </>
              ))
              };
            {selectedMarker ? (
                // 3B Close removes the marker and 
                <Popup
                latitude={parseFloat(selectedMarker.latitude.$numberDecimal)}
                longitude={parseFloat(selectedMarker.longitude.$numberDecimal)}
                onClose={() => {
                  setSelectedMarker(null)
                  setSelectedInstancesArr(null)
                  }}>
                  <h3 className="">
                    {selectedMarker.bizName}, 
                    <h4 className="">
                      {selectedMarker.rating}/5 Crumbs, Price: {selectedMarker.price}
                    </h4>
                  </h3>
                  <h4 className="">
                    {selectedMarker.address1} {selectedMarker.address2} {selectedMarker.address3}
                  </h4>
                  <h4 className="">
                    {selectedMarker.city} {selectedMarker.state}, {selectedMarker.country}
                  </h4>
                  <h4 className="">
                    {selectedMarker.phone}
                  </h4>
                  <h4 className="">
                    <a href={selectedMarker.url} alt="Website Link" target='_blank'> Website Link</a>
                  </h4>
                  <div className="popup-img__img-ctnr">
                    <img src={selectedMarker.imageUrl} />
                  </div>
                  <div>
                      <button className="">
                        Order UberEats
                      </button>
                      <button className="">
                        OpenTable
                      </button>
                      <button className="">
                        Directions
                      </button>
                  </div>
                </Popup>
              ): null}  
            </ReactMapGL>
          </section>
          <section>
            {/* enter the mediaURL later. also an if statement that if there is no mediaURL then it will not appear */}

            {selectedVideo && <iframe width="1024" height="576" src="https://www.youtube.com/embed/nE4kI3X_faU" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>}
          </section>
          <div>

  {/* the below is if there is no selected marker instance arg, then render all instance.  */}
          {
          !selectedInstancesArr ? 
            instancesArr && instancesArr.map(instance => <MapInstanceCards
                renderInstance={instance}
                selectVideoFunc={setSelectedVideo}
              />) 
              :  
              // If there is then render the selected
              selectedInstancesArr && selectedInstancesArr.map(instance => <MapInstanceCards
                renderInstance={instance}
                selectVideoFunc={setSelectedVideo}
              />)}
          
          </div>
        <Footer/>
        </main>
      </div>
    </>
  )
}

export default UserHomePage;
