import React from "react";
import styled from "styled-components";
import NavigationBar from "@/components/NavigationBar";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import FavoriteButton from "@/components/FavoriteButton";
import { useSession } from "next-auth/react";

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
    background-size: cover; /* This should ensure full coverage */
    background-attachment: fixed;
    filter: blur(5px);
    z-index: -1;
  }
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

const DestinationsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  max-width: 900px;
`;

const Destination = styled.div`
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

const ImageList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
`;

const ImageListItem = styled.li`
  margin: 10px;
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

const BottomNavigation = styled(NavigationBar)`
  margin-top: auto;
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
    <PageContainer>
      <ContentContainer>
        <BackLink href="/">Peloponnese</BackLink>
        <Title>Other Destinations</Title>
        <DestinationsGrid>
          {destinations.map((destination) => (
            <>
              <Destination>
                <h2>{destination.name}</h2>
                <Link
                  key={destination._id}
                  href={`other-destinations/${destination._id}`}
                >
                  Learn more
                </Link>
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
              </Destination>
            </>
          ))}
        </DestinationsGrid>
      </ContentContainer>
      <BottomNavigation />
    </PageContainer>
  );
};

export default OtherDestinations;
