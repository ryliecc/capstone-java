import styled from "styled-components";
import {useEffect, useRef, useState} from "react";

export type props = {
    headerText: string;
}

const Container = styled.div`
  width: 100%;
  height: 4em;
  background-color: #9fb9bf;
`;

const PageTitle = styled.h1`
  color: white;
  text-align: center;
`;


export default function AppHeader(props: Readonly<props>) {
    const titleRef = useRef(null);
    const [fontSize, setFontSize] = useState(2.4);

    useEffect(() => {
        const titleElement = titleRef.current;
        const availableWidth = titleElement.offsetWidth;
        const textWidth = titleElement.scrollWidth;

        if (textWidth > availableWidth) {
            setFontSize(fontSize - 0.4);
        }
    }, [props.headerText, fontSize]);

    const style = {
        fontSize: `${fontSize}em`,
    };
    return <Container>
        <PageTitle style={style} ref={titleRef}>{props.headerText}</PageTitle>
    </Container>
}