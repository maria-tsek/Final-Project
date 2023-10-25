import React from "react";
import styled from "styled-components";
import NavigationBar from "@/components/NavigationBar";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import FavoriteButton from "@/components/FavoriteButton";
import { useSession } from "next-auth/react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Center horizontally */
  padding-bottom: 0px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-left: 50px;
  margin-top: 20px;
  font-weight: bold;
  color: #071952;
  width: 100%;
  text-align: center; /* Center text horizontally */
`;

const Destination = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  margin-bottom: 20px;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center; /* Center text horizontally */
`;

const ImageList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap; /* Allow images to wrap to the next row */
  justify-content: center; /* Center images horizontally */
  margin-top: 16px;
  padding: 0; /* Reset padding to remove extra space */
`;

const ImageListItem = styled.li`
  margin: 10px; /* Add spacing around images */
`;

const BackLink = styled(Link)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  color: #071952;
`;

const PopularDestinations = () => {
  const { data: session } = useSession();
  const userId = session?.user?.userId;
  const {
    data: destinations,
    error,
    mutate,
  } = useSWR("/api/popular-destinations");

  if (error) return <div>Failed to load destinations</div>;
  if (!destinations) return <div>Loading destinations...</div>;

  return (
    <Container>
      <BackLink href="/">Peloponnese</BackLink>

      <Title>Popular Destinations</Title>
      {destinations.map((destination) => (
        <Link
          key={destination._id}
          href={`other-destinations/${destination._id}`}
        >
          <Destination>
            <h2>{destination.name}</h2>
            <FavoriteButton
              mutate={mutate}
              destinationId={destination._id}
              userId={userId}
            />
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
        </Link>
      ))}
      <NavigationBar />
    </Container>
  );
};

export default PopularDestinations;
