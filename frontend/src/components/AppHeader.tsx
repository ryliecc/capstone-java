import styled from "styled-components";

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
  font-size: 2.6em;
`;


export default function AppHeader(props: Readonly<props>) {
    return <Container>
        <PageTitle>{props.headerText}</PageTitle>
    </Container>
}