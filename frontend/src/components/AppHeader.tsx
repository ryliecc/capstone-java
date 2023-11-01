import styled from "styled-components";

export type props = {
    headerText: string,
    fontsize: number
}

const Container = styled.div`
  width: 100%;
  height: 4em;
  background-color: #9fb9bf;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
`;

const PageTitle = styled.h1<{$fontsize: number}>`
  color: white;
  font-size: ${props => props.$fontsize}em;
`;


export default function AppHeader(props: Readonly<props>) {
    return <Container>
        <PageTitle $fontsize={props.fontsize}>{props.headerText}</PageTitle>
    </Container>
}