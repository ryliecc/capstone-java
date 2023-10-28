import AppHeader from "../components/AppHeader.tsx";
import {useEffect, useState} from "react";
import {Category} from "../models/CategoryModel.tsx";
import axios from "axios";
import useLocalStorageState from "use-local-storage-state";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button.tsx";
import TrashIcon from "../assets/trash.svg";
import Background from "../components/Background.tsx";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 0.4em;
  padding: 0.4em;
  background-color: #aec8ce;
  position: relative;
  bottom: 0;
  left: 0;
`;

const CategoryType = styled.h2`
  font-size: 1.6em;
  align-self: center;
`;

const CategoryList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.4em;
`;
const CategoryListItem = styled.li`
  font-size: 1.4em;
  border: 0.2em black solid;
  background-color: #d6c7c7;
  border-radius: 10px;
  padding: 0.4em;
  color: black;
  position: relative;
`;

const DeleteButton = styled.button`
  border-radius: 10px;
  position: absolute;
  right: 0.2em;
  top: 0.2em;
  padding: 0;
  background-color: #aec8ce;
  border: none;
  cursor: pointer;
  height: 2em;
  width: 2em;
  font-size: 1em;
`;

const DeleteImage = styled.img`
  position: absolute;
  width: 1.4em;
  top: 0.2em;
  right: 0.3em;
`;

export default function CategoryManagementPage() {
    const [transactionCategories, setTransactionCategories] = useState<Category[]>([]);
    const [creatorId, setCreatorId] = useLocalStorageState("creatorId", {defaultValue: "anonymousUser"});
    const navigateTo = useNavigate();

    const incomeCategories: Category[] = transactionCategories.filter((category: Category) => {
        return category.categoryType === "income";
    });
    const expenseCategories: Category[] = transactionCategories.filter((category: Category) => {
        return category.categoryType === "expense";
    })

    useEffect(() => {
        axios.get("/api/users/me")
            .then(response => {
                setCreatorId(response.data);
            })
    }, [])

    useEffect(() => {
        axios.get("api/budget-app/category/" + creatorId)
            .then(response => {
                setTransactionCategories(response.data);
            })
    }, []);

    function handleClickBack() {
        navigateTo(-1);
    }

    function handleClickDelete(id: string) {
        axios.delete("/api/budget-app/category/" + id)
            .then(() => {
                setTransactionCategories((prevCategories) => {
                    return prevCategories.filter((category) => category.id !== id);
                });
            })
            .catch((error) => {
                console.error("Fehler beim Löschen", error);
            });
    }

    if (creatorId === "anonymousUser") {
        navigateTo("/");
    }
    return <>
        <AppHeader headerText="Manage categories"/>
        <Main>
            <Background/>
            <Button buttonText="Back" onClick={handleClickBack}/>
            <CategoryType>Income categories:</CategoryType>
            <CategoryList>
                {incomeCategories.map((category: Category) => {
                    return (<CategoryListItem key={category.id}>
                        {category.title}
                        <DeleteButton type="button" onClick={() => handleClickDelete(category.id)}><DeleteImage
                            src={TrashIcon} alt="Delete Button"/></DeleteButton>
                    </CategoryListItem>)
                })}
            </CategoryList>
            <CategoryType>Expense categories:</CategoryType>
            <CategoryList>
                {expenseCategories.map((category: Category) => {
                    return (<CategoryListItem key={category.id}>
                        {category.title}
                        <DeleteButton type="button" onClick={() => handleClickDelete(category.id)}><DeleteImage
                            src={TrashIcon} alt="Delete Button"/></DeleteButton>
                    </CategoryListItem>)
                })}
            </CategoryList>
        </Main>
    </>
}