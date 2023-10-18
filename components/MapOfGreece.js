import React from "react";

export default function MapOfGreece() {
  const mapStyle = {
    marginTop: "100px",
    marginRight: "0",
  };

  return (
    <div style={mapStyle}>
      <svg width="1000" height="1000" viewBox="0 0 1100 1100">
        <image href="/greeceHigh (1).svg" width="80%" height="80%" />
      </svg>
    </div>
  );
}
