import AppHeader from "../components/AppHeader.tsx";
import Background from "../components/Background.tsx";
import styled from "styled-components";
import BackButton from "../components/BackButton.tsx";
import Button from "../components/Button.tsx";
import React, {useEffect, useState} from "react";
import axios from "axios";
import useLocalStorageState from "use-local-storage-state";
import {useNavigate} from "react-router-dom";
import {NewMonthlyTransaction} from "../models/NewMonthlyTransaction.tsx";

const Main = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  align-content: center;
`;


export default function RecurringTransactionsManagementPage() {
    const [endDate, setEndDate] = useState("not set");
    const [creatorId, setCreatorId] = useLocalStorageState("creatorId", {defaultValue: "anonymousUser"});
    const navigateTo = useNavigate();

    useEffect(() => {
        axios.get("/api/users/me")
            .then(response => {
                setCreatorId(response.data);
            })
    }, [])
    function handleSubmitNewTransaction(event: React.FormEvent) {
        event.preventDefault();
        const formTarget = event.currentTarget as HTMLFormElement;
        const titleElement = formTarget.elements.namedItem("title") as HTMLInputElement;
        const amountElement = formTarget.elements.namedItem("amountOfMoney") as HTMLInputElement;
        const categoryElement = formTarget.elements.namedItem("transactionCategory") as HTMLInputElement;
        const startDateElement = formTarget.elements.namedItem("startDate") as HTMLInputElement;

        const newMonthlyTransaction: NewMonthlyTransaction = {
            title: titleElement.value,
            startDate: startDateElement.value,
            endDate: endDate,
            amountOfMoney: amountElement.value,
            creatorId: creatorId,
            transactionCategory: categoryElement.value
        }

        axios.post("/api/budget-app/monthly", newMonthlyTransaction)
            .then((response) => {
                console.log("Erfolgreich gespeichert:" + response.data);
            })
            .catch((error) => {
                console.error("Fehler beim Speichern:", error);
            });
    }
    if (creatorId === "anonymousUser") {
        navigateTo("/");
    }
    return <>
        <AppHeader headerText="Recurring"/>
        <Main>
            <Background/>
            <BackButton/>
            <form onSubmit={handleSubmitNewTransaction}>
                <label htmlFor="title">Title:<input name="title" type="text" required/> </label>
                <label htmlFor="amountOfMoney">Money: <input name="amountOfMoney" type="number" step="0.01" required /> </label>
                <label htmlFor="transactionCategory">Category: <input name="transactionCategory" type="text" required /> </label>
                <label htmlFor="startDate">Start Date: <input name="startDate" type="datetime-local" required/></label>
                <Button buttonText="Submit" type="submit"/>
            </form>
        </Main>
    </>
}