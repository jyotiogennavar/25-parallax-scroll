import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "@studio-freight/lenis";

import img1 from "./blacknwhite/1.jpg";
import img2 from "./blacknwhite/2.jpg";
import img3 from "./blacknwhite/3.jpg";
import img4 from "./blacknwhite/4.jpg";
import img5 from "./blacknwhite/5.jpg";
import img6 from "./blacknwhite/6.jpg";
import img7 from "./blacknwhite/7.jpg";
import img8 from "./blacknwhite/8.jpg";
import img9 from "./blacknwhite/9.jpg";
import img10 from "./blacknwhite/10.jpg";
import img11 from "./blacknwhite/11.jpg";
import img12 from "./blacknwhite/12.jpg";

/**
 * Array of image paths.
 * @type {string[]}
 */
const pictures = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
];
/**
 * Custom hook to get the dimensions of the window.
 * @returns {Object} The dimensions object containing the width and height of the window.
 */
const UseDimensions = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  /**
   * Updates the dimensions object with the current width and height of the window.
   */
  const updateDimensions = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    updateDimensions();

    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return dimensions;
};

/**
 * The ParallaxScroll component.
 * @returns {JSX.Element} The JSX element representing the ParallaxScroll component.
 */
const ParallaxScroll = () => {
  useEffect(() => {
    const lenis = new Lenis();

    /**
     * Animation loop using requestAnimationFrame.
     * @param {number} time - The current timestamp.
     */
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  const gallery = React.useRef(null);

  /**
   * Scroll position and progress.
   */
  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const { height } = UseDimensions();

  /**
   * Y-axis transform values for each column.
   */
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3.4]);

  return (
    <>
      <Spacer>
        <h1>Parallax Scroll</h1>
      </Spacer>
      <Gallery>
        <GalleryWrapper ref={gallery}>
          <Column images={[pictures[0], pictures[1], pictures[2]]} y={y} />
          <Column images={[pictures[3], pictures[4], pictures[5]]} y={y2} />
          <Column images={[pictures[6], pictures[7], pictures[8]]} y={y3} />
          <Column images={[pictures[9], pictures[10], pictures[11]]} y={y4} />
         
        </GalleryWrapper>
      </Gallery>

      <Spacer /> 

    </>
   
  );
};

/**
 * The Column component.
 * @param {Object} props - The component props.
 * @param {string[]} props.images - The array of image paths.
 * @param {number} [props.y=0] - The y-axis transform value.
 * @returns {JSX.Element} The JSX element representing the Column component.
 */
const Column = ({ images, y = 0 }) => {
  return (
    <ColumnWrapper style={{ y }}>
      {images.map((picture, index) => {
        return (
          <ImageContainer key={index}>
            <img src={picture} alt={index} />
          </ImageContainer>
        );
      })}
    </ColumnWrapper>
  );
};

/**
 * The Spacer component.
 * @returns {JSX.Element} The JSX element representing the Spacer component.
 */
const Spacer = styled.div`
  font-family: 'Roboto', sans-serif;
  height: 50vh;
  background-color: orange;

  h1 {
    font-size: 2rem;
    text-align: center;
    padding-top: 20vh;
  }
`;

/**
 * The Gallery component.
 * @returns {JSX.Element} The JSX element representing the Gallery component.
 */
const Gallery = styled.div`
  height: 175vh;
  overflow: hidden;
  background-color: rgb(45, 45, 45);
`;

/**
 * The GalleryWrapper component.
 * @returns {JSX.Element} The JSX element representing the GalleryWrapper component.
 */
const GalleryWrapper = styled.div`
  position: relative;
  top: -12.5vh;
  height: 200vh;
  display: flex;
  gap: 2vw;
  padding: 2vw;
`;

/**
 * The ColumnWrapper component.
 * @returns {JSX.Element} The JSX element representing the ColumnWrapper component.
 */
const ColumnWrapper = styled(motion.div)`
  position: relative;
  height: 100%;
  width: 25%;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  gap: 2vw;
  white-space: nowrap;

  &:nth-of-type(1) {
    top: -30%;
  }

  &:nth-of-type(2) {
    top: -70%;
  }

  &:nth-of-type(3) {
    top: -30%;
  }

  &:nth-of-type(4) {
    top: -70%;
  }
`;

/**
 * The ImageContainer component.
 * @returns {JSX.Element} The JSX element representing the ImageContainer component.
 */
const ImageContainer = styled.div`
  position: absolute;
  width: 100%;
  position: relative;
  border-radius: 1vw;
  overflow: hidden;

  img {
    object-fit: cover;
  }
`;

export default ParallaxScroll;
