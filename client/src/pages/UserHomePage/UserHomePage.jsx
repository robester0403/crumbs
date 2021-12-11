import './UserHomePage.scss';
import Header from "../../components/Header/Header";
import MapInstanceCards from '../../components/MapInstanceCards/MapInstanceCards';
import React, { useState, useEffect } from "react";
import ReactMapGL, {Marker, Popup} from "react-map-gl";
import mapmarker from "../../assets/images/food-icon.png";
import axios from 'axios';

const UserHomePage = () => {
  const [markerArr, setMarkerArr] = useState(null);
  const [instancesArr, setInstancesArr] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedInstancesArr, setSelectedInstancesArr] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 43.65845826670497,
    longitude: -79.385555,
    width: "64rem",
    height: "50vh",
    zoom: 10.5
  });
  
  const onLoadMarker = async () => {
    // redo this link
    await axios.get(`http://localhost:5000/api/instancemap/marker/all`)
    .then(res => {
      setMarkerArr(res.data.markers)
    })
    .catch(error => console.log(error))
  }

  const onLoadInstance = async () => {
    await axios.get(`http://localhost:5000/api/instancemap/inst/all`)
    .then(res => {
      setInstancesArr(res.data.instances)
    })
    .catch(error => console.log(error))
  }

  const targetInstanceSetter = async (targetBizId) => {
    await axios.get(`http://localhost:5000/api/instancemap/inst/${targetBizId}`)
    .then(res=> {
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
  
  return (
    <>
      <div className="userHomePage__wrap">
        <main >
        <Header/>
          <section className="userHomePage__map-ctnr">
            <ReactMapGL
            onViewportChange={(newView) => setViewport(newView)}
            mapboxApiAccessToken={"pk.eyJ1Ijoicm9iZXN0ZXIwNDAzIiwiYSI6ImNrd2loN204ZTE4OGMyc280OHUxNzRpa3EifQ.m2pjCyZdJVLQmPEgO1EJ9w"}
            {...viewport}
            mapStyle="mapbox://styles/robester0403/ckwiiyulp1tc914kz01i19hh3"
            >

              {markerArr && markerArr.map((marker) => (
                <>
                  <Marker 
                  key={ marker.id }
                  latitude= {parseFloat(marker.latitude.$numberDecimal)}
                  longitude={parseFloat(marker.longitude.$numberDecimal)}
                  offsetTop={-viewport.zoom * 5}
                  offsetLeft={-viewport.zoom*2.6}
                  >

                    <button className="marker-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedMarker(marker);
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
                <Popup className="popup"
                latitude={parseFloat(selectedMarker.latitude.$numberDecimal)}
                longitude={parseFloat(selectedMarker.longitude.$numberDecimal)}
                onClose={() => {
                  setSelectedMarker(null)
                  setSelectedInstancesArr(null)
                  setSelectedVideo(null)
                  }}>
                  <article className="popup">
                    <h3 className="popup__header">
                      {selectedMarker.bizName}
                    </h3>
                    <h4 className="popup__sub-ctnr">
                      <div className="popup__body">
                        <span className="popup__body-bold">{selectedMarker.rating}</span>/5 Crumbs, Price: <span className="popup__body-bold">{selectedMarker.price}</span>
                      </div>
                      <div className="popup__weblink">
                        <a href={selectedMarker.url} alt="Website Link" target='_blank' rel="noreferrer"> Website Link</a>
                      </div>
                    </h4>
                    <h4 className="popup__body">
                      {selectedMarker.address1} {selectedMarker.address2} {selectedMarker.address3}, {selectedMarker.city}, {selectedMarker.state}, {selectedMarker.country}
                    </h4>
                      <div className="popup__body">
                        {selectedMarker.phone}
                      </div>
                    <div className="popup__img-ctnr">
                      <img className="popup__img" src={selectedMarker.imageUrl} alt={selectedMarker.bizName} />
                    </div>
                    <div className="popup__btn-ctnr">
                        <a href="https://www.ubereats.com/" alt="UberEats link" className="popup__uber-btn">
                          Order UberEats
                        </a>
                        <a href="https://www.opentable.com/" alt="Opentable link" className="popup__otable-btn">
                          OpenTable
                        </a>
                        <a href="https://www.google.com/maps" alt="GoogleMaps link" className="popup__direct-btn">
                          Directions
                        </a>
                    </div>
                  </article>
                </Popup>
              ): null}  
            </ReactMapGL>
          </section>
          <section>
            {selectedVideo && <iframe id="videoframe" width="1024" height="576" src={selectedVideo.mediaLinkUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>}
          </section>
          <div>
          {
          !selectedInstancesArr ? 
            instancesArr && instancesArr.map(instance => <MapInstanceCards
                key={instance.id}
                renderInstance={instance}
                selectVideoFunc={setSelectedVideo}
              />) 
              :  
              selectedInstancesArr && selectedInstancesArr.map(instance => <MapInstanceCards
                key={instance.id}
                renderInstance={instance}
                selectVideoFunc={setSelectedVideo}
              />)}
          </div>
        </main>
      </div>
    </>
  )
}

export default UserHomePage;
