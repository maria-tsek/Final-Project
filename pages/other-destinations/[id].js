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

const BackgroundImage = "https://images5.alphacoders.com/129/1295700.jpg";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const ContentContainer = styled.div`
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

const Title = styled.h1`
  font-size: 24px;
  color: #071952;
`;

const BackLink = styled(Link)`
  position: absolute;
  left: 10px;
  font-size: 30px;
  color: #002447;
  text-decoration: none;
  box-shadow: 5px 5px 10px rgba(0, 0.5, 0.5, 0.5);
`;

const DestinationContainer = styled.div`
  flex: 0 0 calc(33.33% - 20px);
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 20px;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 9px 9px rgba(0, 0, 0, 0.2);
  min-width: 300px;
  margin-top: 40px;
`;

const DestinationTitle = styled.h2`
  font-size: 20px;
`;

const ImagesList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
`;

const ImageItem = styled.li`
  margin: 10px;
`;

const Description = styled.p`
  font-size: 18px;
`;

const NavigationBarContainer = styled.div`
  text-align: center;
  width: 100%;
`;

const MapContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
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
      <ContentContainer>
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
              </ImageItem>
            ))}
          </ImagesList>
          <li>
            <strong>Description:</strong>
            <Description>{destination.description}</Description>
          </li>
        </DestinationContainer>
        <MapContainer>
          <MapBox
            longitude={destination.longitude}
            latitude={destination.latitude}
          />
        </MapContainer>
      </ContentContainer>
      <NavigationBarContainer>
        <NavigationBar />
      </NavigationBarContainer>
    </PageContainer>
  );
};

export default DetailPage;
