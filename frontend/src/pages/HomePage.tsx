import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import AppHeader from "../components/AppHeader.tsx";
import Button from "../components/Button.tsx";
import axios from "axios";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  text-align: center;
  gap: 0.8em;
  padding: 0.4em;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.6em;
  justify-content: center;
`;

export default function HomePage() {
    const navigateTo = useNavigate();

    function handleClickNewTransaction() {
        navigateTo("/newtransaction");
    }

    function handleClickAllTransactions() {
        navigateTo("/transactions")
    }

    function handleClickLogin() {
        const host: string = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin;
        window.open(host + '/oauth2/authorization/github', '_blank');
    }

    function handleClickMe() {
        axios.get("/api/users/me")
            .then(response => {
                console.log("Username: " + response.data);
            })
    }

    return <>
        <AppHeader headerText="Home"/>
        <Main>
            <div>This is the HomePage.</div>
            <ButtonContainer>
                <Button buttonText="Login with Github" onClick={handleClickLogin}/>
                <Button buttonText="Get my name" onClick={handleClickMe}/>
            </ButtonContainer>
            <ButtonContainer>
                <Button onClick={handleClickAllTransactions}
                        buttonText="All transactions"/>
                <Button onClick={handleClickNewTransaction} buttonText="New transaction"/>
            </ButtonContainer>
        </Main>
    </>
}