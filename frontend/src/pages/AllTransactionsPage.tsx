import {useEffect, useState} from "react";
import axios from "axios";
import {Transaction} from "../models/TransactionModel.tsx";
import {useNavigate} from "react-router-dom";
import AppHeader from "../components/AppHeader.tsx";
import Button from "../components/Button.tsx";
import styled from "styled-components";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  gap: 0.6em;
  padding: 0.6em;
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.6em;
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
`;

export default function AllTransactionsPage() {
    const navigateTo = useNavigate();
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        axios
            .get("/api/budget-app")
            .then((response) => {
                setTransactions(response.data);
            });
    }, []);

    function handleClickBackButton() {
        navigateTo(-1);
    }

    return <>
        <AppHeader headerText="Past expenses"/>
        <Main>
        <Button onClick={handleClickBackButton} buttonText="Back"/>
        <h2>Past transactions:</h2>
        <List>{transactions?.map((transaction) => {
            return(<ListItem key={transaction.title}>
                <span>Title: {transaction.title}</span>
                <span>Amount of Money: {transaction.amountOfMoney}</span>
            </ListItem>);
        })}</List>
        </Main>
    </>
}