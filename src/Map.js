import React, { useRef, useEffect, useState } from 'react';
import Legend from './components/legend';
import 'mapbox-gl/dist/mapbox-gl.css';
/* eslint import/no-webpack-loader-syntax: off */
import mapboxgl from '!mapbox-gl';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_APP_TOKEN

function Map(props) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(props.group.coordinates.longitude); 
  const [lat, setLat] = useState(props.group.coordinates.latitude); 
  const [zoom, setZoom] = useState(13);
  const [markers] = useState([]);
  
  //initialize map //
  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      })
    );
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'bottom-right'
    );
  });

  //update map on move
  useEffect(() => {
    if (!map.current) return;
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  const addMarkers = (postList) => {
    postList.map((post) => {
      const marker = new mapboxgl.Marker({
        color: selectColor(post),
      })
        .setLngLat([post.coordinates.longitude, post.coordinates.latitude])
        .setPopup(
          new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: true,
          }).setHTML(
            `<span style='display:flex;'>
              <img src='${
                post.profile_img
              }' style='border-radius:100%; width:40px; height:40px;'/>
              <h1 style='margin-left:10px; font-weight:500;'>${
                post.username
              }</h1>
              </span>
              <h1 style='padding-top:5px; word-wrap:break-word;'>${trimBody(post.body)}</h1>`
          )
        )
        .addTo(map.current);
      markers.push(marker);
      return marker;
    });
  };

  const trimBody = (body) => {
    let trimmed = body.split(' ').slice(0, 20);
    return body.length === trimmed.join(' ').length 
    ? trimmed.join(' ') 
    : trimmed.join(' ') + '...';

  };

  const selectColor = (post) => {
    if (post.tag === 'general') return '#9381FF';
    if (post.tag === 'forsale') return '#B8B8FF';
    if (post.tag === 'safety') return '#FFD8BE';
  };

  const removeMarkers = () => {
    if (markers.length !== 0) {
      for (let marker of markers) {
        marker.remove();
      }
    }
  };

  useEffect(() => {
    removeMarkers();
    addMarkers(props.posts);
  }, [props.posts]);



  return (
    <div className='flex grow relative z-0'>
      <div className='flex justify-left absolute z-10 m-2 opacity-95'>
      <Legend />
      </div>
      <div ref={mapContainer}
        className='flex grow min-h-[400px] justify-center rounded border-2 border-secondary'/>
    </div>
  );
}

export default Map;
