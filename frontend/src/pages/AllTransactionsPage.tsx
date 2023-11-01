import {useEffect, useState} from "react";
import axios from "axios";
import {Transaction} from "../models/TransactionModel.tsx";
import {useNavigate} from "react-router-dom";
import AppHeader from "../components/AppHeader.tsx";
import styled from "styled-components";
import TrashIcon from "../assets/trash.svg";
import useLocalStorageState from "use-local-storage-state";
import Background from "../components/Background.tsx";
import BackButton from "../components/BackButton.tsx";
import DeleteRecurringWindow from "../components/DeleteRecurringWindow.tsx";
import formatMoney from "../hooks/formatMoney.tsx";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  gap: 0.6em;
  padding: 0.6em;
  position: relative;
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

const DataContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 3.2em;
`;

const Category = styled.div`
  background-color: #ddadad;
  font-size: 1em;
  text-align: center;
  padding: 0 0.4em;
  width: min-content;
  border-radius: 5px;
`;

const DeleteButton = styled.button`
  border-radius: 10px;
  position: absolute;
  align-self: end;
  padding: 0;
  background-color: #aec8ce;
  border: none;
  cursor: pointer;
  height: 2.6em;
  width: 2.6em;
  font-size: 1em;
  top: 0.6em;
`;

const ButtonImage = styled.img`
  position: absolute;
  left: 0.3em;
  top: 0.3em;
  width: 2em;
`;

export default function AllTransactionsPage() {
    const [creatorId, setCreatorId] = useLocalStorageState("creatorId", {defaultValue: "anonymousUser"});
    const navigateTo = useNavigate();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isDeleteWindowVisible, setIsDeleteWindowVisible] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const [deleteReferenceId, setDeleteReferenceId] = useState("");

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

    function handleClickDelete(id: string, referenceId: string) {
        if (referenceId === "daily_transaction") {
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
        } else {
            setDeleteId(id);
            setDeleteReferenceId(referenceId);
            setIsDeleteWindowVisible(true);
        }


    }

    // Sort transactions by date in descending order
    const sortedTransactions = transactions.slice().sort((a: Transaction, b: Transaction) => {
        const dateA= new Date(a.timeLogged).getTime();
        const dateB= new Date(b.timeLogged).getTime();
        return dateB - dateA;
    });

    // Group transactions by date
    const groupedTransactions: { [dateKey: string]: Transaction[] } = {};

    sortedTransactions.forEach((transaction: Transaction) => {
        const dateKey: string = transaction.timeLogged.split("T")[0]; // Extract date part
        if (!groupedTransactions[dateKey]) {
            groupedTransactions[dateKey] = [];
        }
        groupedTransactions[dateKey].push(transaction);
    });

    function formatDate(dateKey: string) {
        const parts = dateKey.split('-'); // Assuming the dateKey is in the format 'yyyy-mm-dd'
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }

    if (creatorId === "anonymousUser") {
        navigateTo("/");
    }
    return <>
        <AppHeader fontsize={2} headerText="Past transactions"/>
        <Main>
            <Background/>
            <BackButton/>
            <DeleteRecurringWindow setIsVisible={setIsDeleteWindowVisible} isVisible={isDeleteWindowVisible} id={deleteId} referenceId={deleteReferenceId} setTransactions={setTransactions}/>
            <h2>Past transactions:</h2>
            {Object.keys(groupedTransactions).map((dateKey: string) => (
                <div key={dateKey}>
                    <h3>{formatDate(dateKey)}</h3>
                    <List>
                        {groupedTransactions[dateKey].map((transaction: Transaction) => (
                            <ListItem key={transaction.id}>
                                <DataContainer>
                                    <span>{transaction.title}</span>
                                    <span>{formatMoney(transaction.amountOfMoney.toString())}€</span>
                                </DataContainer>
                                <Category>{transaction.transactionCategory}</Category>
                                <DeleteButton
                                    type="button"
                                    onClick={() => handleClickDelete(transaction.id, transaction.referenceId)}
                                >
                                    <ButtonImage src={TrashIcon} alt="Trash Icon" />
                                </DeleteButton>
                            </ListItem>
                        ))}
                    </List>
                </div>
            ))}
        </Main>
    </>
}