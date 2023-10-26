import React from "react";
import styled from "styled-components";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import NavigationBar from "@/components/NavigationBar";
import Image from "next/image";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((r) => r.json());

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BackLink = styled(Link)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  color: #071952;
`;

const Title = styled.h1`
  font-size: 24px;
  color: black;
`;

const FavoritePlace = styled.div`
  margin: 20px 0;
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
`;

const PlaceName = styled.h2`
  font-size: 20px;
  color: #444;
`;

const ImageList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ImageListItem = styled.li`
  margin: 10px 0;
`;

// const MapUrl = styled.p`
//   font-weight: bold;
// `;

const Description = styled.p`
  font-style: italic;
`;
const NavigationBarContainer = styled.div`
  text-align: center;
  width: 100%;
`;

export default function FavoriteDestinations() {
  const { data: session } = useSession();
  const userId = session?.user?.userId;

  const { data, error } = useSWR(`/api/users/favorites/${userId}`, fetcher);
  console.log("data", data);

  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Loading...</div>;

  const favoritePlaces = data.favoritePlaces;

  return (
    <Container>
      <BackLink href="/">Peloponnese</BackLink>
      <Title>Favorite Places</Title>
      {favoritePlaces ? (
        favoritePlaces.map((place, index) => (
          <FavoritePlace key={index}>
            <PlaceName>{place.name}</PlaceName>
            <ImageList>
              {place.images.map((image, imgIndex) => (
                <ImageListItem key={imgIndex}>
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
                </ImageListItem>
              ))}
            </ImageList>
            {/* <MapUrl>
              <strong>Map URL:</strong>{" "}
              <a href={place.mapURL} target="_blank" rel="noopener noreferrer">
                {place.mapURL}
              </a>
            </MapUrl> */}
            <Description>
              <strong>Description:</strong> {place.description}
            </Description>
          </FavoritePlace>
        ))
      ) : (
        <p>No favorite places found.</p>
      )}
      <NavigationBarContainer>
        <NavigationBar />
      </NavigationBarContainer>
    </Container>
  );
}
