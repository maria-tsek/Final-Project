import React from "react";
import { Map } from "react-map-gl";
import { mapboxAccessToken } from "../secret.json";
export default function MapBox() {
  console.log(mapboxAccessToken);
  return (
    <div>
      <Map
        mapboxAccessToken={mapboxAccessToken}
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      />
    </div>
  );
}
