import AppHeader from "../components/AppHeader.tsx";
import LogoutIcon from "../assets/arrow-left-on-rectangle.svg";
import Button from "../components/Button.tsx";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import {useEffect, useState} from "react";
import axios from "axios/index";

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

export default function DashboardPage() {
    const navigateTo = useNavigate();
    const [creatorId, setCreatorId] = useLocalStorageState("creatorId", {defaultValue: "anonymousUser"});
    const [userBalance, setUserBalance] = useState("0.00");

    useEffect(() => {
        axios.get("/api/budget-app/balance/" + creatorId)
            .then(response => {
                setUserBalance(response.data);
            })
    }, [creatorId])

    function handleClickNewTransaction() {
        navigateTo("/newtransaction");
    }

    function handleClickAllTransactions() {
        navigateTo("/transactions")
    }

    function handleClickLogout() {
        axios.post("/api/logout")
            .catch(error => {
                console.log("Fehler beim Ausloggen: " + error);
            });
        setCreatorId("anonymousUser");
    }

    if(creatorId === "anonymousUser") {
        navigateTo("/");
    }
    return <>
        <AppHeader headerText="Dashboard"/>
        <Main>
            <LogoutButton type="button" onClick={handleClickLogout}>
                <ButtonImage src={LogoutIcon} alt="Logout Icon"/>
            </LogoutButton>
            <div>Hello User {creatorId}! Your current balance is {userBalance}€</div>

            <ButtonContainer>
                <Button onClick={handleClickAllTransactions}
                        buttonText="All transactions"/>
                <Button onClick={handleClickNewTransaction} buttonText="New transaction"/>
            </ButtonContainer>
        </Main>
    </>
}