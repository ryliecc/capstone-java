import {NewTransaction} from "../models/NewTransactionModel.tsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import AppHeader from "../components/AppHeader.tsx";
import Button from "../components/Button.tsx";
import styled from "styled-components";
import useLocalStorageState from "use-local-storage-state";
import {useEffect} from "react";

export type props = {
    titleText: string,
    moneyText: string,
    headerText: string,
    isExpense: boolean;
}

const Main = styled.main`
display: flex;
flex-direction: column;
gap: 0.6em;
  justify-content: center;
  align-content: center;
  padding: 0.6em;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.6em;
`;

export default function NewTransactionPage(props: props) {
    const [creatorId, setCreatorId] = useLocalStorageState("creatorId", {defaultValue: "anonymousUser"});
    const navigateTo = useNavigate();

    useEffect(() => {
        axios.get("/api/users/me")
            .then(response => {
                setCreatorId(response.data);
            })
    }, [])

    function handleSubmitForm(event: React.FormEvent) {
        event.preventDefault();
        const formTarget = event.currentTarget as HTMLFormElement;
        const titleElement = formTarget.elements.namedItem("title") as HTMLInputElement;
        const amountElement = formTarget.elements.namedItem("amountOfMoney") as HTMLInputElement;

        const amountOfMoneyData = props.isExpense ? ("-" + amountElement.value) : amountElement.value;
        const newTransaction: NewTransaction = {
            title: titleElement.value,
            amountOfMoney: amountOfMoneyData,
            creatorId: creatorId
        };

        axios
            .post("/api/budget-app", newTransaction)
            .then((response) => {
                console.log("Erfolgreich gespeichert:" + response.data);
            })
            .catch((error) => {
                console.error("Fehler beim Speichern:", error);
            })
            .then(() => navigateTo("/dashboard"));
    }

    function handleClickBackButton() {
        navigateTo(-1);
    }

    if(creatorId === "anonymousUser") {
        navigateTo("/");
    }
    return <>
        <AppHeader headerText={props.headerText}/>
        <Main>
        <Button onClick={handleClickBackButton} buttonText="Back"/>
        <div>Add a new transaction</div>
        <Form onSubmit={handleSubmitForm}>
            <label htmlFor={"title"}>{props.titleText}</label>
            <input name={"title"} id={"title"} type={"text"} required/>
            <label htmlFor={"moneyAmount"}>{props.moneyText}</label>
            <input name={"amountOfMoney"} id={"moneyAmount"} type={"text"} required/>
            <Button type="submit" buttonText="Submit"/>
        </Form>
        </Main>
    </>
}