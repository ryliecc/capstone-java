import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import AppHeader from "../components/AppHeader.tsx";
import Button from "../components/Button.tsx";
import axios from "axios";
import {useEffect} from "react";
import useLocalStorageState from "use-local-storage-state";
import LogoutIcon from "../assets/arrow-left-on-rectangle.svg";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  text-align: center;
  gap: 0.8em;
  padding: 0.4em;
  position: relative;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.6em;
  justify-content: center;
`;

const LogoutButton = styled.button`
  border-radius: 10px;
  position: absolute;
  align-self: end;
  padding: 0;
  background-color: #aec8ce;
  border: none;
  cursor: pointer;
  height: 3em;
  width: 3em;
  top: -3.8em;
  left: 1em;
  font-size: 1em;
`;

const ButtonImage = styled.img`
  position: absolute;
  left: 0.4em;
  top: 0.4em;
  width: 2.2em;
`;

export default function HomePage() {
    const navigateTo = useNavigate();
    const [creatorId, setCreatorId] = useLocalStorageState("creatorId", {defaultValue: "anonymousUser"});

    useEffect(() => {
        axios.get("/api/users/me")
            .then(response => {
                setCreatorId(response.data);
            })
    }, [])

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
                setCreatorId(response.data);
            })
    }

    function handleClickLogout() {
        axios.post("/api/logout")
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log("Fehler beim Ausloggen: " + error);
            });
        setCreatorId("anonymousUser");
    }


    if(creatorId === "anonymousUser"){
        return <>
            <AppHeader headerText="Budget App"/>
            <Main>
                <div>Welcome to the Budget App! Please log in to proceed. If you are not automatically redirected please hit the "Refresh"-Button below.</div>
                <ButtonContainer>
                    <Button buttonText="Login" onClick={handleClickLogin}/>
                    <Button buttonText="Refresh" onClick={handleClickMe}/>
                </ButtonContainer>
            </Main>
        </>
    }
    return <>
        <AppHeader headerText="Home"/>
        <Main>
            <LogoutButton type="button" onClick={handleClickLogout}>
                <ButtonImage src={LogoutIcon} alt="Logout Icon"/>
            </LogoutButton>
            <div>Hello User {creatorId}! This is the HomePage.</div>

            <ButtonContainer>
                <Button onClick={handleClickAllTransactions}
                        buttonText="All transactions"/>
                <Button onClick={handleClickNewTransaction} buttonText="New transaction"/>
            </ButtonContainer>
        </Main>
    </>
}