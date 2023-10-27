import React, { useState } from "react";
import Image from "next/image";
import styled from "styled-components";

const MainContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h1`
  background-color: rgba(173, 216, 230, 0.8);
  top: 0;
  left: 0;
  width: 100%;
  text-align: center; /* Center the text */
  position: absolute;
  margin: 0;
  padding: 20px; /* Add padding for spacing */
  font-size: 2em; /* Increase font size */
`;

const ImageCarousel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CarouselImage = styled.div`
  max-width: 100%;
  max-height: 100%;
  display: block;
  margin: 0 auto;
  margin-top: 0;
`;

const CarouselControls = styled.div`
  display: flex;
  margin-top: 10px;
`;

const CarouselButton = styled.button`
  margin: 0 10px;
  background-color: lightblue;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 5px 10px;
  transition: background-color 0.2s;

  &.active {
    background-color: blue;
  }

  &:hover {
    background-color: darkblue;
  }
`;

const About = styled.div`
  font-size: 1.2em;
  text-align: left;
  margin-top: 40px;
  margin-left: 20px;
  padding: 20px;
  background-color: #f7f7f7; /* Add a background color */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add a subtle box shadow */
  line-height: 1.5; /* Increase line height for readability */
`;

const H4 = styled.h4`
  font-size: 1.8em; /* Increase font size */
  font-weight: bold;
  margin-top: 20px; /* Adjust the margin */
  margin-left: 20px;
`;

export default function MainContent() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "/5C337B33-7131-4F2C-A581-3A8267405F26.jpeg",
    "/CD984176-D46B-4532-A481-CAE5458BB64D_1_105_c.jpeg",
  ];

  const handleChangeImage = (index) => {
    setCurrentImage(index);
  };

  return (
    <MainContentWrapper>
      <Header>Peloponnese</Header>
      <ImageCarousel>
        <CarouselImage>
          <Image
            key={currentImage}
            src={images[currentImage]}
            alt={`Image ${currentImage + 1}`}
            width={1200}
            height={700}
          />
        </CarouselImage>
        <CarouselControls>
          {images.map((_, index) => (
            <CarouselButton
              key={index}
              onClick={() => handleChangeImage(index)}
            />
          ))}
        </CarouselControls>
      </ImageCarousel>
      <H4>Peloponnese: Greece&#39;s Historic Peninsula of Legends</H4>
      <About>
        <p>
          {`Nestled in the southern part of mainland Greece, the Peloponnese is a
          land steeped in history and mythology. This rugged and diverse
          peninsula boasts a rich tapestry of ancient ruins, medieval towns, and
          pristine beaches that draw travelers from across the globe. With the
          mythical city of Mycenae, the ancient theater of Epidaurus, and the
          majestic Temple of Apollo Epicurius, the Peloponnese is an
          archaeological wonderland that echoes the stories of the past. But
          this region is not just about its past; it&#39;s also a place of
          natural beauty, featuring serene coastlines along the Ionian and
          Aegean Seas, picturesque villages, and vibrant traditions. As you
          explore the Peloponnese, you&#39;ll embark on a journey through time
          and nature, making it a destination that truly captures the essence of
          Greece&#39;s historic and mythical legacy.`}
        </p>
      </About>
    </MainContentWrapper>
  );
}
