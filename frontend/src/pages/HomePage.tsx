import {Transaction} from "../models/TransactionModel.tsx";
import axios from "axios";
import {useEffect, useState} from "react";

export default function HomePage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        axios
            .get("/api/budget-app")
            .then((response) => {
            setTransactions(response.data);
        });
        console.log(transactions);
    }, [])

    function handleSubmitForm(event: React.FormEvent) {
        event.preventDefault();
        const formTarget = event.currentTarget as HTMLFormElement;
        const titleElement = formTarget.elements.namedItem("title") as HTMLInputElement;
        const amountElement = formTarget.elements.namedItem("amountOfMoney") as HTMLInputElement;
        const newTransaction: Transaction = {
            title: titleElement.value,
            amountOfMoney: amountElement.value
        };
        axios
            .post("/api/budget-app", {newTransaction})
            .then((response) => {
            console.log("Erfolgreich gespeichert:" + response.data);
        })
            .catch((error) => {
            console.error("Fehler beim Speichern:", error);
        });
    }

    return <>
        <div>This is the HomePage.</div>
        <h2>Add a new Transaction</h2>
        <form onSubmit={handleSubmitForm}>
            <label htmlFor={"title"}>Title:</label>
            <input name={"title"} id={"title"} type={"text"} required/>
            <label htmlFor={"moneyAmount"}>Amount of Money:</label>
            <input name={"amountOfMoney"} id={"moneyAmount"} type={"text"} required/>
            <button type={"submit"}>Submit</button>
        </form>
        <h2>Past transactions:</h2>
        <ul>{transactions?.map((transaction) => {
            return <>
                <li>
                    <span>Title: {transaction.title}</span>
                    <span>Amount of Money: {transaction.amountOfMoney}</span>
                </li></>
        })}</ul>
    </>
}