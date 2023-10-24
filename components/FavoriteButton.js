import React from "react";
import { useSession } from "next-auth/react";
import { useState } from "react";
// import { useEffect } from "react";

const FavoriteButton = ({ destinationId, mutate }) => {
  const { data: session } = useSession();
  const userId = session?.user?.userId;
  console.log("userId", userId);
  const [isFavorite, setIsFavorite] = useState("false");
  console.log("isFavorite", isFavorite);

  async function fetchUser() {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const user = await response.json();
        console.log("user", user);
        const favoritePlaces = await user.favoritePlaces;
        console.log("favoritePlaces", favoritePlaces);
        const isFavorite = favoritePlaces.includes(destinationId);
        setIsFavorite(isFavorite);
      }
    } catch (error) {
      console.error("Error fetching favorite places:", error);
    }
  }

  fetchUser();

  // fetch user here
  // check if the destinationId exists in favoritePlaces or not
  // if it exists, set isFavorite to true
  // otherwise, set it to false

  async function onToggleFavorite() {
    const action = isFavorite ? "remove" : "add";

    const response = await fetch("/api/other-destinations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ destinationId, userId, action }),
    });

    if (response.ok) {
      mutate();
    }
  }

  return (
    <button onClick={onToggleFavorite}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={isFavorite ? "red" : "black"}
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </button>
  );
};

export default FavoriteButton;
