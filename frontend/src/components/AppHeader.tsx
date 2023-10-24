import styled from "styled-components";

export type props = {
    headerText : string;
}

const Container = styled.div`
  width: 100%;
  height: 4em;
  background-color: #9fb9bf;
  padding-bottom: 0.6em;
`;

const PageTitle = styled.h1`
  font-size: 3em;
  color: white;
  text-align: center;
`

export default function AppHeader(props : props) {
    return <Container>
        <PageTitle>{props.headerText}</PageTitle>
    </Container>
}