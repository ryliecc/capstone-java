import {NewTransaction} from "../models/NewTransactionModel.tsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import AppHeader from "../components/AppHeader.tsx";
import Button from "../components/Button.tsx";
import styled from "styled-components";
import useLocalStorageState from "use-local-storage-state";
import React, {useEffect, useState} from "react";
import {Category} from "../models/CategoryModel.tsx";
import NewCategoryWindow from "../components/NewCategoryWindow.tsx";
import AddIcon from "../assets/plus-circle.svg";
import Background from "../components/Background.tsx";
import BackButton from "../components/BackButton.tsx";
import {NewMonthlyTransaction} from "../models/NewMonthlyTransaction.tsx";

export type props = {
    titleText: string,
    moneyText: string,
    headerText: string,
    isExpense: boolean,
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 0.6em;
  justify-content: center;
  align-content: center;
  padding: 0.6em;
  position: relative;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.6em;
  font-size: 1.2em;
`;

const FormInput = styled.input`
  background-color: whitesmoke;
  height: 2em;
  color: black;
  font-size: 1.2em;
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4em;
`;

const SingleCategory = styled.label`
  display: flex;
  gap: 0.4em;
  padding: 0 0.4em;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  position: relative;
  background-color: #d6c7c7;
  font-size: 1em;
`;

const CategoryInput = styled.input`
  display: inline-block;
`;

const AddButton = styled.button`
  background-color: #d6c7c7;
  border: 1px solid #ccc;
  border-radius: 5px;
  position: relative;
  font-size: 1em;
  text-align: center;
  display: flex;
  align-items: center;
  gap: 0.2em;
  padding: 0 0.2em;
`;

const ButtonImage = styled.img`
  width: 1.6em;
`;


export default function NewTransactionPage(props: Readonly<props>) {
    const [transactionCategories, setTransactionCategories] = useState<Category[]>([]);
    const [newCategoryIsVisible, setNewCategoryIsVisible] = useState(false);
    const [creatorId, setCreatorId] = useLocalStorageState("creatorId", {defaultValue: "anonymousUser"});
    const [isMonthly, setIsMonthly] = useState(false);
    const navigateTo = useNavigate();

    useEffect(() => {
        axios.get("/api/users/me")
            .then(response => {
                setCreatorId(response.data);
            })
    }, [])

    useEffect(() => {
        axios.get("api/budget-app/category/" + creatorId)
            .then((response) => {
                const fetchedCategories = response.data;
                const filteredCategories = fetchedCategories.filter((category: Category) => {
                    if (props.isExpense) {
                        return category.categoryType === "expense";
                    } else {
                        return category.categoryType === "income";
                    }
                });
                setTransactionCategories(filteredCategories);
            });
    }, []);

    const updateCategories = (newCategory: Category) => {
        setTransactionCategories((prevCategories: Category[]) => [...prevCategories, newCategory]);
    };


    function handleSubmitForm(event: React.FormEvent) {
        event.preventDefault();
        const formTarget = event.currentTarget as HTMLFormElement;
        const titleElement = formTarget.elements.namedItem("title") as HTMLInputElement;
        const amountElement = formTarget.elements.namedItem("amountOfMoney") as HTMLInputElement;
        const categoryElement = formTarget.elements.namedItem("transactionCategory") as HTMLInputElement;
        const startDateElement = formTarget.elements.namedItem("startDate") as HTMLInputElement;
        const endDateElement = formTarget.elements.namedItem("endDate") as HTMLInputElement;

        const amountOfMoneyData = props.isExpense ? ("-" + amountElement.value) : amountElement.value;
        if (!isMonthly) {
            const newTransaction: NewTransaction = {
                title: titleElement.value,
                amountOfMoney: amountOfMoneyData,
                creatorId: creatorId,
                transactionCategory: categoryElement.value
            };

            axios
                .post("/api/budget-app", newTransaction)
                .then((response) => {
                    console.log("Erfolgreich gespeichert:" + response.data);
                })
                .catch((error) => {
                    console.error("Fehler beim Speichern:", error);
                })
                .then(() => navigateTo(-1));
        } else {
            const newMonthlyTransaction: NewMonthlyTransaction = {
                title: titleElement.value,
                startDate: startDateElement.value,
                endDate: endDateElement.value ? endDateElement.value : "not set",
                amountOfMoney: amountOfMoneyData,
                creatorId: creatorId,
                transactionCategory: categoryElement.value
            }

            axios.post("/api/budget-app/monthly", newMonthlyTransaction)
                .then((response) => {
                    console.log("Erfolgreich gespeichert:" + response.data);
                })
                .catch((error) => {
                    console.error("Fehler beim Speichern:", error);
                })
                .then(() => navigateTo(-1));
        }

    }

    function handleClickAddNewCategory() {
        setNewCategoryIsVisible(true);
    }

    const allCategories = transactionCategories.map((category: Category) => {
        return (<SingleCategory key={category.id} htmlFor={category.title}><CategoryInput type="radio"
                                                                                          name="transactionCategory"
                                                                                          value={category.title}
                                                                                          id={category.title}/>{category.title}
        </SingleCategory>)
    });
    const categoriesElement = transactionCategories.length >= 1 ? allCategories : "No categories created yet."


    const monthlyTimeElement = (<><label htmlFor="startDate">Start Date: <FormInput name="startDate"
                                                                                    type="datetime-local"
                                                                                    required/></label>
        <label htmlFor="endDate">End Date: <FormInput name="endDate" type="datetime-local"/></label></>)
    const monthlyElement = isMonthly ? monthlyTimeElement : ""

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsMonthly(event.target.checked);
    };


    if (creatorId === "anonymousUser") {
        navigateTo("/");
    }
    return <>
        <AppHeader fontsize={2.6} headerText={props.headerText}/>
        <Main>
            <Background/>
            <BackButton/>
            <NewCategoryWindow creatorId={creatorId} isExpense={props.isExpense} isVisible={newCategoryIsVisible}
                               setIsVisible={setNewCategoryIsVisible} updateCategories={updateCategories}/>
            <Form onSubmit={handleSubmitForm}>
                <label htmlFor={"title"}>{props.titleText}</label>
                <FormInput name={"title"} id={"title"} type={"text"} required/>
                <label htmlFor={"moneyAmount"}>{props.moneyText}</label>
                <FormInput name={"amountOfMoney"} id={"moneyAmount"} type="number" step="0.01" min="0" required/>
                <label htmlFor="isMonthlyCheckbox">Monthly Transaction</label>
                <input name="isMonthlyCheckbox" type="checkbox" checked={isMonthly} onChange={handleCheckboxChange}/>
                {monthlyElement}
                <div>Choose a category:</div>
                <CategoryContainer>
                    {categoriesElement}
                    <AddButton type="button" onClick={handleClickAddNewCategory}>
                        <ButtonImage src={AddIcon} alt="Add new Category"/>
                        New Category
                    </AddButton>
                </CategoryContainer>

                <Button type="submit" buttonText="Submit"/>
            </Form>
        </Main>
    </>
}