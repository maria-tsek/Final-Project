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
  align-items: center;
  justify-content: center; /* Center contents vertically */
  text-align: center; /* Center align text within the container */
  min-height: 100vh; /* Minimum height to take up the full viewport */
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #071952;
  width: 100%;
  margin: 0; /* Reset margin to avoid extra space */
`;

const Destination = styled.div`
  margin: 20px 0;
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
`;

const ImageList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap; /* Allow wrapping images when necessary */
  align-items: center;
`;

const ImageListItem = styled.li`
  margin: 10px;
`;

const BackLink = styled(Link)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  color: #071952;
`;

const OtherDestinations = () => {
  const { data: session } = useSession();
  const userId = session?.user?.userId;
  const {
    data: destinations,
    error,
    mutate,
  } = useSWR("/api/other-destinations");

  if (error) return <div>Failed to load destinations</div>;
  if (!destinations) return <div>Loading destinations...</div>;

  return (
    <Container>
      <BackLink href="/">Peloponnese</BackLink>

      <Title>Other Destinations</Title>
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

export default OtherDestinations;
