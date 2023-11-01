import AppHeader from "../components/AppHeader.tsx";
import LogoutIcon from "../assets/arrow-left-on-rectangle.svg";
import Button from "../components/Button.tsx";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import {useEffect, useState} from "react";
import axios from "axios";
import PlusIcon from "../assets/plus.svg";
import MinusIcon from "../assets/minus.svg";
import Background from "../components/Background.tsx";
import formatMoney from "../hooks/formatMoney.tsx";
import AppMenu from "../components/AppMenu.tsx";
import {Main} from "../components/Main.tsx";

const BalanceContainer = styled.div`
  width: 7em;
  height: 7em;
  border: 0.2em solid whitesmoke;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3em;
  font-weight: bold;
  align-self: center;
  position: relative;
`;

const BudgetText = styled.div`
  position: absolute;
  font-size: 0.6em;
  top: 3.4em;
`;

const BalanceText = styled.div`
  position: absolute;
  font-size: 0.4em;
  top: 10.4em;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.8em;
  position: relative;
  top: -3em;
`;

const TransactionButton = styled.button`
  width: 5em;
  height: 5em;
  border: 0.2em whitesmoke solid;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d6c7c7;
  cursor: pointer;
`;

const TransactionButtonImage = styled.img`
  width: 3em;
`;

const LogoutButton = styled.button`
  border-radius: 10px;
  position: absolute;
  padding: 0;
  background-color: #aec8ce;
  border: none;
  cursor: pointer;
  height: 3em;
  width: 3em;
  top: -3.6em;
  left: 0.6em;
  font-size: 1em;
  bottom: 0;
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
    const [dailyBudget, setDailyBudget] = useState("0.00");

    useEffect(() => {
        axios.get("/api/budget-app/balance/" + creatorId)
            .then(response => {
                setUserBalance(response.data);
            })
    }, [creatorId])

    useEffect(() => {
        axios.get("api/budget-app/daily-budget/" + creatorId)
            .then(response => {
                setDailyBudget(response.data);
            })
    }, [creatorId]);

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

    function handleClickAddIncome() {
        navigateTo("/new-income");
    }

    function handleClickAddExpense() {
        navigateTo("/new-expense");
    }

    function handleClickManageCategories() {
        navigateTo("/category-management");
    }

    if (creatorId === "anonymousUser") {
        navigateTo("/");
    }
    return <>
        <AppHeader fontsize={2.8} headerText="Dashboard"/>
        <Main>
            <AppMenu activePage="dashboard"/>
            <Background/>
            <LogoutButton type="button" onClick={handleClickLogout}>
                <ButtonImage src={LogoutIcon} alt="Logout Icon"/>
            </LogoutButton>
            <div>Hello User {creatorId}!</div>
            <BalanceContainer>
                <BudgetText>Daily Budget:</BudgetText>
                {formatMoney(dailyBudget.toString())}€
                <BalanceText>Balance: {formatMoney(userBalance.toString())}€</BalanceText>
            </BalanceContainer>
            <ButtonContainer>
                <TransactionButton type="button" onClick={handleClickAddIncome}>
                    <TransactionButtonImage src={PlusIcon} alt="Add income"/>
                </TransactionButton>
                <TransactionButton type="button" onClick={handleClickAddExpense}>
                    <TransactionButtonImage src={MinusIcon} alt="Add expense"/>
                </TransactionButton>
            </ButtonContainer>
            <Button onClick={handleClickAllTransactions}
                    buttonText="All transactions"/>
            <Button buttonText="Manage categories" onClick={handleClickManageCategories} />
        </Main>
    </>
}