import {useEffect, useState} from "react";
import axios from "axios";
import {Transaction} from "../models/TransactionModel.tsx";
import AppHeader from "../components/AppHeader.tsx";
import styled from "styled-components";
import Background from "../components/Background.tsx";
import BackButton from "../components/BackButton.tsx";
import formatMoney from "../hooks/formatMoney.tsx";
import AppMenu from "../components/AppMenu.tsx";
import {Main} from "../components/Main.tsx";
import useLocalStorageState from "use-local-storage-state";
import TransactionDetailsWindow from "../components/TransactionDetailsWindow.tsx";

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6em;
`;

const ListItem = styled.button`
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

const DataContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Category = styled.div`
  background-color: #ddadad;
  font-size: 1em;
  text-align: center;
  padding: 0 0.4em;
  width: min-content;
  border-radius: 5px;
`;

export default function AllTransactionsPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [creatorId] = useLocalStorageState("creatorId", {defaultValue: "anonymousUser"});
    const initialTransaction: Transaction = {
        id: "",
        title: "",
        timeLogged: "",
        amountOfMoney: "",
        creatorId: "",
        transactionCategory: "",
        referenceId: ""
    }
    const [detailsTransaction, setDetailsTransaction] = useState<Transaction>(initialTransaction);
    const [isDetailsWindowVisible, setIsDetailsWindowVisible] = useState(false);


    useEffect(() => {
        axios
            .get("/api/budget-app/" + creatorId)
            .then((response) => {
                setTransactions(response.data);
            });
    }, [creatorId]);

    const sortedTransactions = transactions.slice().sort((a: Transaction, b: Transaction) => {
        const dateA = new Date(a.timeLogged).getTime();
        const dateB = new Date(b.timeLogged).getTime();
        return dateB - dateA;
    });

    const groupedTransactions: { [dateKey: string]: Transaction[] } = {};

    sortedTransactions.forEach((transaction: Transaction) => {
        const dateKey: string = transaction.timeLogged.split("T")[0];
        if (!groupedTransactions[dateKey]) {
            groupedTransactions[dateKey] = [];
        }
        groupedTransactions[dateKey].push(transaction);
    });

    function formatDate(dateKey: string) {
        const parts = dateKey.split('-');
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }

    function handleClickTransaction(transaction: Transaction) {
        setDetailsTransaction(transaction);
        setIsDetailsWindowVisible(true);
    }

    return <>
        <AppHeader fontsize={2} headerText="Past transactions"/>
        <Main>
            <Background/>
            <BackButton/>
            <AppMenu activePage="transactions"/>
            <TransactionDetailsWindow transaction={detailsTransaction} isVisible={isDetailsWindowVisible}
                                      setIsVisible={setIsDetailsWindowVisible} setTransactions={setTransactions}/>
            <h2>Past transactions:</h2>
            {Object.keys(groupedTransactions).map((dateKey: string) => (
                <div key={dateKey}>
                    <h3>{formatDate(dateKey)}</h3>
                    <List>
                        {groupedTransactions[dateKey].map((transaction: Transaction) => (
                            <ListItem type="button" key={transaction.id} onClick={() => {
                                handleClickTransaction(transaction)
                            }}>
                                <DataContainer>
                                    <span>{transaction.title}</span>
                                    <span>{formatMoney(transaction.amountOfMoney.toString())}€</span>
                                </DataContainer>
                                <Category>{transaction.transactionCategory}</Category>
                            </ListItem>
                        ))}
                    </List>
                </div>
            ))}
        </Main>
    </>
}