import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import AppHeader from "../components/AppHeader.tsx";
import Button from "../components/Button.tsx";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  text-align: center;
  gap: 0.4em;
  padding: 0.4em;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.6em;
`;

export default function HomePage() {
    const navigateTo = useNavigate();

    function handleClickNewTransaction() {
        navigateTo("/newtransaction");
    }

    function handleClickAllTransactions() {
        navigateTo("/transactions")
    }

    return <>
        <AppHeader headerText="Home"/>
        <Main>
        <div>This is the HomePage.</div>
        <ButtonContainer>
            <Button buttonType="button" handleButtonClick={handleClickAllTransactions}
                    buttonText="See all transactions"/>
            <Button buttonType="button" handleButtonClick={handleClickNewTransaction} buttonText="Add new transaction"/>
        </ButtonContainer>
        </Main>
    </>
}