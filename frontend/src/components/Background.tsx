import styled from "styled-components";

const BackgroundElement = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #aec8ce; /* Adjust the background color and opacity as needed */
  z-index: -100;
`;

export default function Background() {
    return <>
        <BackgroundElement/>
    </>
}