import {useEffect, useState} from "react";
import axios from "axios";
import {Transaction} from "../models/TransactionModel.tsx";
import {useNavigate} from "react-router-dom";
import AppHeader from "../components/AppHeader.tsx";
import Button from "../components/Button.tsx";
import styled from "styled-components";
import TrashIcon from "../assets/trash.svg";
import useLocalStorageState from "use-local-storage-state";

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
  position: relative;
  font-size: 1.2em;
  border: 0.2em black solid;
  background-color: #d6c7c7;
  border-radius: 10px;
  padding: 0.4em;
  color: black;
`;

const DeleteButton = styled.button`
  border-radius: 10px;
  position: absolute;
  align-self: end;
  padding: 0;
  background-color: #aec8ce;
  border: none;
  cursor: pointer;
  height: 3em;
  width: 3em;
  font-size: 1em;
  top: 1.2em;
`;

const ButtonImage = styled.img`
  position: absolute;
  left: 0.4em;
  top: 0.4em;
  width: 2.2em;
`;

export default function AllTransactionsPage() {
    const [creatorId, setCreatorId] = useLocalStorageState("creatorId", {defaultValue: "anonymousUser"});
    const navigateTo = useNavigate();
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        axios.get("/api/users/me")
            .then(response => {
                setCreatorId(response.data);
            })
    }, [])

    useEffect(() => {
        axios
            .get("/api/budget-app/" + creatorId)
            .then((response) => {
                setTransactions(response.data);
            });
    }, [creatorId]);

    function handleClickBackButton() {
        navigateTo(-1);
    }

    function handleClickDelete(id : string) {
        axios
            .delete("/api/budget-app/" + id)
            .then(() => {
                setTransactions((prevTransactions) => {
                    return prevTransactions.filter((transaction) => transaction.id !== id);
                });
            })
            .catch((error) => {
                console.error("Fehler beim Löschen", error);
            });

    }

    if(creatorId === "anonymousUser") {
        navigateTo("/");
    }
    return <>
        <AppHeader headerText="Past expenses"/>
        <Main>
        <Button onClick={handleClickBackButton} buttonText="Back"/>
        <h2>Past transactions:</h2>
        <List>{transactions?.map((transaction) => {
            return(<ListItem key={transaction.id}>
                <span>Title: {transaction.title}</span>
                <span>Amount of Money: {transaction.amountOfMoney}</span>
                <span>Category: {transaction.transactionCategory}</span>
                <DeleteButton type="button" onClick={() => handleClickDelete(transaction.id)}>
                    <ButtonImage src={TrashIcon} alt="Trash Icon"/>
                </DeleteButton>
            </ListItem>);
        })}</List>
        </Main>
    </>
}