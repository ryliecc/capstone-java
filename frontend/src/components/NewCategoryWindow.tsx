import styled from "styled-components";
import Button from "./Button.tsx";
import {NewCategory} from "../models/NewCategoryModel.tsx";
import axios from "axios";

export type props = {
    creatorId: string,
    isExpense: boolean;
}

const Container = styled.div``;

const Window = styled.div``;

const Form = styled.form``;

const Label = styled.label``;

const Input = styled.input``;
export default function NewCategoryWindow(props: props) {

    function handleClickSubmit(event: React.FormEvent) {
        event.preventDefault();
        const formTarget = event.currentTarget as HTMLFormElement;
        const nameElement = formTarget.elements.namedItem("categoryName") as HTMLInputElement;

        const newCategory: NewCategory = {
            title: nameElement.value,
            creatorId: props.creatorId,
            categoryType: props.isExpense ? "expense" : "income"
        }

        axios.post("/api/budget-app/category", newCategory)
            .then((response) => {
            console.log("Erfolgreich gespeichert:" + response.data);
        })
            .catch((error) => {
                console.error("Fehler beim Speichern:", error);
            });
    }

    return <Container>
        <Window>
            <Form onSubmit={handleClickSubmit}>
                <Label htmlFor="categoryName">Category Name:</Label>
                <Input type="text" id="categoryName" name="categoryName"/>
                <Button buttonText="Submit" type="submit"/>
            </Form>
        </Window>
    </Container>
}