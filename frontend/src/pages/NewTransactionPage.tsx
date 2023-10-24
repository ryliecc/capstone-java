import {Transaction} from "../models/TransactionModel.tsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import AppHeader from "../components/AppHeader.tsx";
import Button from "../components/Button.tsx";
import styled from "styled-components";

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
export default function NewTransactionPage() {
    const navigateTo = useNavigate();
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
            .post("/api/budget-app", newTransaction)
            .then((response) => {
                console.log("Erfolgreich gespeichert:" + response.data);
            })
            .catch((error) => {
                console.error("Fehler beim Speichern:", error);
            })
            .then(() => navigateTo("/"));
    }

    function handleClickBackButton() {
        navigateTo(-1);
    }

    return <>
        <AppHeader headerText="New Expense"/>
        <Main>
        <Button buttonType="button" handleButtonClick={handleClickBackButton} buttonText="Back"/>
        <div>Add a new transaction</div>
        <Form onSubmit={handleSubmitForm}>
            <label htmlFor={"title"}>Title:</label>
            <input name={"title"} id={"title"} type={"text"} required/>
            <label htmlFor={"moneyAmount"}>Amount of Money:</label>
            <input name={"amountOfMoney"} id={"moneyAmount"} type={"text"} required/>
            <Button buttonType={"submit"} buttonText="Submit" handleButtonClick={handleSubmitForm}/>
        </Form>
        </Main>
    </>
}