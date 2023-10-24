import React from "react";
import styled from "styled-components";
import NavigationBar from "@/components/NavigationBar";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import FavoriteButton from "@/components/FavoriteButton";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Container = styled.div`
  padding-bottom: 0px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-left: 10px;
  color: #071952;
  width: 100%;
`;

const Destination = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  margin-bottom: 20px;
  list-style-type: none;
  position: relative; /* Added for the heart button positioning */
`;

const ImageList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

const ImageListItem = styled.li`
  margin-right: 10px;
`;

const BackButton = styled(Link)`
  background-color: #071952;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
  display: inline-block;
  margin-left: 10px;
`;

const OtherDestinations = () => {
  const {
    data: destinations,
    error,
    mutate,
  } = useSWR("/api/other-destinations", fetcher);

  if (error) return <div>Failed to load destinations</div>;
  if (!destinations) return <div>Loading destinations...</div>;

  return (
    <Container>
      <Title>Other Destinations</Title>
      {destinations.map((destination) => (
        <Destination key={destination._id}>
          <h2>{destination.name}</h2>
          <FavoriteButton mutate={mutate} destinationId={destination._id} />
          <ImageList>
            {destination.images.map((image, index) => (
              <ImageListItem key={index}>
                <a
                  href={image.image1}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={image.image1}
                    width={300}
                    height={200}
                    alt={`Image 1`}
                  />
                </a>
              </ImageListItem>
            ))}
          </ImageList>
          <li>
            <strong>Map URL:</strong>{" "}
            <a
              href={destination.mapURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {destination.mapURL}
            </a>
          </li>
          <li>
            <strong>Description:</strong>
            <p>{destination.description}</p>
          </li>
        </Destination>
      ))}
      <BackButton href="/">Peloponnese</BackButton>
      <NavigationBar />
    </Container>
  );
};

export default OtherDestinations;
