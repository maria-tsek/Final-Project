import React from "react";
import styled from "styled-components";
import NavigationBar from "@/components/NavigationBar";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import FavoriteButton from "@/components/FavoriteButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const BackgroundImage =
  "https://images.freeimages.com/images/large-previews/51b/blue-sky-1160827.jpg";

const ContentContainer = styled.div`
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
    background: url(${BackgroundImage}) no-repeat fixed center center;
    background-size: cover;
    filter: blur(5px);
    z-index: -1;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  margin-top: 80px;
  font-weight: bold;
  color: #071952;
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
`;

const DestinationsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space between;
  gap: 20px;
  max-width: 1300px;
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
  align-items: center;
  top: 10px;
  font-size: 40px;
  color: #002447;
  text-decoration: inherit;
`;

const KnowLink = styled(Link)`
  position: absolute;
  font-size: 20px;
  margin-top: 270px;
`;

const OtherDestinations = () => {
  const { data: session } = useSession();
  const userId = session?.user?.userId;
  const {
    data: destinations,
    error,
    mutate,
  } = useSWR("/api/other-destinations");
  const router = useRouter();

  if (error) return <div>Failed to load destinations</div>;
  if (!destinations) return <div>Loading destinations...</div>;

  return (
    <div>
      <ContentContainer>
        <BackLink href="/">Peloponnese Tour</BackLink>
        <Title>Other Destinations</Title>
        <DestinationsGrid>
          {destinations.map((destination) => (
            <Destination key={destination._id}>
              <h2>{destination.name}</h2>
              <FavoriteButton
                mutate={mutate}
                destinationId={destination._id}
                userId={userId}
              />
              <KnowLink href={`other-destinations/${destination._id}`}>
                Learn more
              </KnowLink>
              <ImageList>
                {destination.images.map((image, index) => (
                  <ImageListItem key={index}>
                    <div
                      onClick={() =>
                        router.push(`other-destinations/${destination._id}`)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <Image
                        src={image.image1}
                        width={300}
                        height={200}
                        alt={`Image 1`}
                      />
                    </div>
                  </ImageListItem>
                ))}
              </ImageList>
            </Destination>
          ))}
        </DestinationsGrid>
      </ContentContainer>
      <NavigationBar />
    </div>
  );
};

export default OtherDestinations;
