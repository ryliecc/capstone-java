import {NewTransaction} from "../models/NewTransactionModel.tsx";
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

const SubmitButton = styled.button`align-items: center;
  background-color: #d6c7c7;
  border: 0.2em solid #111;
  border-radius: 0.4em;
  box-sizing: border-box;
  color: #111;
  cursor: pointer;
  display: flex;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  height: 48px;
  justify-content: center;
  line-height: 24px;
  max-width: 100%;
  padding: 1.4em;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:after {
    background-color: #111;
    border-radius: 8px;
    content: "";
    display: block;
    height: 48px;
    left: 0;
    width: 100%;
    position: absolute;
    top: -2px;
    transform: translate(8px, 8px);
    transition: transform 0.2s ease-out;
    z-index: -1;
  }

  &:hover:after {
    transform: translate(0, 0);
  }

  &:active {
    background-color: #ddadad;
    outline: 0;
  }

  &:hover {
    outline: 0;
  }

  @media (min-width: 768px) {
    padding: 0 40px;
  }
`;
export default function NewTransactionPage() {
    const navigateTo = useNavigate();
    function handleSubmitForm(event: React.FormEvent) {
        event.preventDefault();
        const formTarget = event.currentTarget as HTMLFormElement;
        const titleElement = formTarget.elements.namedItem("title") as HTMLInputElement;
        const amountElement = formTarget.elements.namedItem("amountOfMoney") as HTMLInputElement;

        const newTransaction: NewTransaction = {
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
        <Button onClick={handleClickBackButton} buttonText="Back"/>
        <div>Add a new transaction</div>
        <Form onSubmit={handleSubmitForm}>
            <label htmlFor={"title"}>Title:</label>
            <input name={"title"} id={"title"} type={"text"} required/>
            <label htmlFor={"moneyAmount"}>Amount of Money:</label>
            <input name={"amountOfMoney"} id={"moneyAmount"} type={"text"} required/>
            <SubmitButton type="submit">Submit</SubmitButton>
        </Form>
        </Main>
    </>
}