import { useState } from "react";

function DestinationComponent({ place }) {
  const [isFavorite, setIsFavorite] = useState(place.favorite);

  const handleFavorite = async () => {
    try {
      const response = await fetch(`/api/other-destinations?id=${place._id}`, {
        method: "POST",
      });

      if (response.ok) {
        setIsFavorite(!isFavorite);
      } else {
        // Handle error
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>{place.name}</h2>
      <p>{place.Header}</p>
      <button onClick={handleFavorite}>{isFavorite ? "❤️" : ""}</button>
    </div>
  );
}
