import React from "react";
import styled from "styled-components";
import NavigationBar from "@/components/NavigationBar";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import FavoriteButton from "@/components/FavoriteButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import MapBox from "../map";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #071952;
`;

const BackLink = styled(Link)`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 24px;
  color: #071952;
`;

const DestinationContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex-grow: 1;
`;

const DestinationTitle = styled.h2`
  font-size: 20px;
`;

const ImagesList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const ImageItem = styled.li`
  margin: 10px;
`;

// const MapLink = styled.a`
//   color: #071952;
//   text-decoration: none;
// `;

const Description = styled.p`
  font-size: 16px;
`;

const NavigationBarContainer = styled.div`
  text-align: center;
  width: 100%;
`;

const DetailPage = () => {
  const { data: session } = useSession();
  const userId = session?.user?.userId;
  const router = useRouter();
  const { id } = router.query;
  console.log("router.query", router.query);
  const {
    data: destination,
    error,
    mutate,
  } = useSWR(`/api/other-destinations/${id}`);

  if (error) return <div>Failed to load destination</div>;
  if (!destination) return <div>Loading destination...</div>;

  return (
    <PageContainer>
      <Title>Detail Page</Title>
      <BackLink href="/">Peloponnese</BackLink>
      <DestinationContainer key={destination._id}>
        <DestinationTitle>{destination.name}</DestinationTitle>
        <FavoriteButton
          mutate={mutate}
          destinationId={destination._id}
          userId={userId}
        />
        <ImagesList>
          {destination.images.map((image, index) => (
            <ImageItem key={index}>
              <a href={image.image1} target="_blank" rel="noopener noreferrer">
                <Image
                  src={image.image1}
                  width={300}
                  height={200}
                  alt={`Image 1`}
                />
              </a>
            </ImageItem>
          ))}
        </ImagesList>
        <li>
          <strong>Description:</strong>
          <Description>{destination.description}</Description>
        </li>
      </DestinationContainer>
      <MapBox
        longitude={destination.longitude}
        latitude={destination.latitude}
      />
      <NavigationBarContainer>
        <NavigationBar />
      </NavigationBarContainer>
    </PageContainer>
  );
};

export default DetailPage;
