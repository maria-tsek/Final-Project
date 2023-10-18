import React from "react";
import Icons from "../components/Icons";
import NavigationBar from "../components/NavigationBar";
import MainContent from "../components/MainContent";
import dynamic from "next/dynamic";
import styled from "styled-components";

const MapOfGreece = dynamic(() => import("../components/MapOfGreece"), {
  ssr: false,
});

const HomePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export default function Home() {
  return (
    <HomePageWrapper>
      <Icons />
      <MainContent />
      <MapOfGreece />
      <NavigationBar />
    </HomePageWrapper>
  );
}
