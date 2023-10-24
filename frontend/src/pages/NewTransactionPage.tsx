import {Transaction} from "../models/TransactionModel.tsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";


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
        <button type="button" onClick={handleClickBackButton}>Go back</button>
        <div>Add a new transaction</div>
        <form onSubmit={handleSubmitForm}>
            <label htmlFor={"title"}>Title:</label>
            <input name={"title"} id={"title"} type={"text"} required/>
            <label htmlFor={"moneyAmount"}>Amount of Money:</label>
            <input name={"amountOfMoney"} id={"moneyAmount"} type={"text"} required/>
            <button type={"submit"}>Submit</button>
        </form>
    </>
}