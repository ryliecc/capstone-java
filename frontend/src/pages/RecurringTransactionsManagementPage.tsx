import AppHeader from "../components/AppHeader.tsx";
import Background from "../components/Background.tsx";
import styled from "styled-components";
import BackButton from "../components/BackButton.tsx";

const Main = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  align-content: center;
`;


export default function RecurringTransactionsManagementPage() {

    return <>
        <AppHeader headerText="Manage transactions" />
        <Main>
            <Background/>
            <BackButton/>
        </Main>
    </>
}