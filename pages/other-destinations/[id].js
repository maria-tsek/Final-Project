import React from "react";
import styled from "styled-components";
import NavigationBar from "@/components/NavigationBar";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import FavoriteButton from "@/components/FavoriteButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const PageContainer = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #071952;
`;

const BackLink = styled(Link)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  color: #071952;
`;

const DestinationContainer = styled.div`
  margin-top: 20px;
`;

const DestinationTitle = styled.h2`
  font-size: 20px;
`;

const ImagesList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ImageItem = styled.li`
  margin-bottom: 20px;
`;

const MapLink = styled.a`
  color: #071952;
  text-decoration: none;
`;

const Description = styled.p`
  font-size: 16px;
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
        <MapLink
          href={destination.mapURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>Map URL:</strong> {destination.mapURL}
        </MapLink>
        <li>
          <strong>Description:</strong>
          <Description>{destination.description}</Description>
        </li>
      </DestinationContainer>
      <NavigationBar />
    </PageContainer>
  );
};

export default DetailPage;
