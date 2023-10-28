import styled from "styled-components";
import Button from "./Button.tsx";
import {NewCategory} from "../models/NewCategoryModel.tsx";
import axios from "axios";
import CloseIcon from "../assets/x-mark.svg";

export type props = {
    creatorId: string,
    isExpense: boolean,
    isVisible: boolean,
    // eslint-disable-next-line @typescript-eslint/ban-types
    setIsVisible: Function;
}

const Container = styled.div<{ $isVisible?: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(174, 200, 206, 0.5);
  z-index: 1;
  display: ${props => (props.$isVisible ? 'flex' : 'none')};
  flex-direction: column;
  padding: 1em;
  padding-top: 50%;
`;


const Window = styled.div`
  background-color: #9fb9bf;
  border: solid black 1em;
  border-radius: 2em;
  padding: 0.8em;
  position: relative;
`;

const CloseButton = styled.button`
  border: none;
  background-color: transparent;
  position: absolute;
  right: 1em;
`;

const ButtonImage = styled.img`
  width: 2.6em;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.4em;
  margin-bottom: 1em;
  font-size: 1.2em;
`;

const Label = styled.label`
    font-size: 1.4em;
`;

const Input = styled.input`
  background-color: whitesmoke;
  color: black;
  font-size: 1.2em;
`;
export default function NewCategoryWindow(props: Readonly<props>) {

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
        props.setIsVisible(false);
    }

    function handleClickCloseWindow() {
        props.setIsVisible(false);
    }

    return <Container $isVisible={props.isVisible}>
        <Window>
            <CloseButton onClick={handleClickCloseWindow}>
                <ButtonImage src={CloseIcon} alt="Close Window Icon"/>
            </CloseButton>
            <Form onSubmit={handleClickSubmit}>
                <Label htmlFor="categoryName">New Category</Label>
                <Input type="text" id="categoryName" name="categoryName"/>
                <Button buttonText="Submit" type="submit"/>
            </Form>
        </Window>
    </Container>
}