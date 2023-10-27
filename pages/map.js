import React from "react";
import Map, { Marker } from "react-map-gl";
// import { mapboxAccessToken } from "../secret.json";

import "mapbox-gl/dist/mapbox-gl.css";

const mapStyle = {
  width: "50vw",
  height: "50vh",
};

const mapboxAccessToken = process.env.NEXT_PUBLIC_mapboxAccessToken;
console.log("mapboxAccessToken", mapboxAccessToken);

export default function MapBox({ longitude, latitude }) {
  return (
    <Map
      mapboxAccessToken={mapboxAccessToken}
      initialViewState={{
        longitude,
        latitude,
        zoom: 7,
      }}
      style={mapStyle}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker
        longitude={longitude}
        latitude={latitude}
        anchor="bottom"
      ></Marker>
    </Map>
  );
}
