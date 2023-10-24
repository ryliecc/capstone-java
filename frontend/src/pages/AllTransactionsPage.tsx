import {useEffect, useState} from "react";
import axios from "axios";
import {Transaction} from "../models/TransactionModel.tsx";
import {useNavigate} from "react-router-dom";


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
        <button type="button" onClick={handleClickBackButton}>Go back</button>
        <h2>Past transactions:</h2>
        <ul>{transactions?.map((transaction) => {
            return(<li>
                <span>Title: {transaction.title}</span>
                <span>Amount of Money: {transaction.amountOfMoney}</span>
            </li>);
        })}</ul>
    </>
}