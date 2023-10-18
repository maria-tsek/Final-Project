import React, { useState, useEffect } from "react";

export default function PopularDestinations() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/popular-places");
        if (response.ok) {
          const data = await response.json();
          setPlaces(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Popular Destinations</h1>
      {places.map((place) => (
        <div key={place._id}>
          <h2>{place.name}</h2>
          <p>{place.Header}</p>
          <ul>
            <li>
              <strong>Images:</strong>
              <ul>
                {place.images.map((image, index) => (
                  <li key={index}>
                    <a
                      href={image.image1}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Image {index + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <strong>Map URL:</strong>{" "}
              <a href={place.mapURL} target="_blank" rel="noopener noreferrer">
                {place.mapURL}
              </a>
            </li>
            <li>
              <strong>Description:</strong>
              <p>{place.description}</p>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}
