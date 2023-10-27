import React from "react";
import styled from "styled-components";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import NavigationBar from "@/components/NavigationBar";
import Image from "next/image";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((r) => r.json());

const BackgroundImage =
  "https://images.freeimages.com/images/large-previews/51b/blue-sky-1160827.jpg";

const Container = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(${BackgroundImage}) no-repeat center center;
    background-size: cover;
    background-attachment: fixed;
    filter: blur(5px);
    z-index: -1;
  }
`;

const BackLink = styled(Link)`
  position: absolute;
  top: 20px;
  left: 10px;
  font-size: 30px;
  color: #002447;
  text-decoration: none;
  box-shadow: 5px 5px 10px rgba(0, 0.5, 0.5, 0.5);
`;

const Title = styled.h1`
  font-size: 28px;
  margin-top: 20px;
  font-weight: bold;
  color: #071952;
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
`;

const FavoritePlace = styled.div`
  flex: 0 0 calc(33.33% - 20px);
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 9px 9px rgba(0, 0, 0, 0.2);
  min-width: 300px;
`;

const PlaceName = styled.h2`
  font-size: 20px;
  color: #444;
`;

const ImageList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
`;

const ImageListItem = styled.li`
  margin: 10px 0;
`;

const Description = styled.p`
  font-style: italic;
`;
const NavigationBarContainer = styled.div`
  text-align: center;
  width: 100%;
  margin-top: auto;
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
