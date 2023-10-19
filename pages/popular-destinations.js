import React from "react";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import NavigationBar from "@/components/NavigationBar";
import styled from "styled-components";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Container = styled.div`
  padding-bottom: 0px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-left: 10px;
  background-color: #add8e6;
  width: 100%;
`;

const Destination = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  margin-bottom: 20px;
  list-style-type: none;
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
  background-color: black;
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

export default function PopularDestinations() {
  const { data, error, isLoading } = useSWR(
    "/api/popular-destinations",
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <Container>
      <Title>Popular Destinations</Title>
      {data.map((place) => (
        <Destination key={place._id}>
          <h2>{place.name}</h2>
          <p>{place.Header}</p>
          <ImageList>
            {place.images.map((image, index) => (
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
            <a href={place.mapURL} target="_blank" rel="noopener noreferrer">
              {place.mapURL}
            </a>
          </li>
          <li>
            <strong>Description:</strong>
            <p>{place.description}</p>
          </li>
        </Destination>
      ))}
      <BackButton href="/">Back</BackButton>
      <NavigationBar />
    </Container>
  );
}
