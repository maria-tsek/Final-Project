import useSWR from "swr";
import { useSession } from "next-auth/react";
import NavigationBar from "@/components/NavigationBar";
import Image from "next/image";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function FavoriteDestinations() {
  const { data: session } = useSession();
  const userId = session?.user?.userId;

  const { data, error } = useSWR(`/api/users/favorites/${userId}`, fetcher);
  console.log("data", data);

  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Loading...</div>;

  const favoritePlaces = data.favoritePlaces;

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const titleStyle = {
    fontSize: "24px",
    color: "black",
  };

  const favoritePlaceStyle = {
    margin: "20px 0",
    border: "1px solid #ddd",
    padding: "10px",
    textAlign: "center",
  };

  const placeNameStyle = {
    fontSize: "20px",
    color: "#444",
  };

  const imageListStyle = {
    listStyle: "none",
    padding: 0,
  };

  const imageListItemStyle = {
    margin: "10px 0",
  };

  const mapUrlStyle = {
    fontWeight: "bold",
  };

  const descriptionStyle = {
    fontStyle: "italic",
  };

  return (
    <div style={containerStyle}>
      <Link
        href="/"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          fontSize: "24px",
          color: "#071952",
        }}
      >
        Peloponnese
      </Link>
      <h1 style={titleStyle}>Favorite Places</h1>
      {favoritePlaces ? (
        favoritePlaces.map((place, index) => (
          <div key={index} style={favoritePlaceStyle}>
            <h2 style={placeNameStyle}>{place.name}</h2>
            <ul style={imageListStyle}>
              {place.images.map((image, imgIndex) => (
                <li key={imgIndex} style={imageListItemStyle}>
                  <a
                    href={image.image1}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={image.image1}
                      alt={`Image 1`}
                      width={300}
                      height={200}
                    />
                  </a>
                </li>
              ))}
            </ul>
            <p style={mapUrlStyle}>
              <strong>Map URL:</strong>{" "}
              <a href={place.mapURL} target="_blank" rel="noopener noreferrer">
                {place.mapURL}
              </a>
            </p>
            <p style={descriptionStyle}>
              <strong>Description:</strong> {place.description}
            </p>
          </div>
        ))
      ) : (
        <p>No favorite places found.</p>
      )}
      <NavigationBar />
    </div>
  );
}
