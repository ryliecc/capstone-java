import styled from "styled-components";
import React, {useState} from "react";
import {Transaction} from "../models/TransactionModel.tsx";
import CloseIcon from "../assets/x-mark.svg";
import Button from "./Button.tsx";
import formatMoney from "../hooks/formatMoney.tsx";
import DeleteIcon from "../assets/trash.svg";
import axios from "axios";
import DeleteRecurringWindow from "./DeleteRecurringWindow.tsx";

export type props = {
    transaction: Transaction,
    isVisible: boolean,
    // eslint-disable-next-line @typescript-eslint/ban-types
    setIsVisible: Function,
    // eslint-disable-next-line @typescript-eslint/ban-types
    setTransactions: Function
}

const Container = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  height: 100%;
  width: 100%;
  top: ${(props) => (props.$isVisible ? "0" : "-100%")};
  left: 0;
  z-index: 3;
  background-color: whitesmoke;
  transition: top 0.3s;
  color: black;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 4em;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.button`
  position: absolute;
  border: none;
  right: 1.4em;
  top: 1em;
`;

const CloseImage = styled.img`
  width: 3em;
`;

const EditButton = styled.button`
  color: black;
  position: absolute;
  left: 0.8em;
  top: 0.4em;
  font-size: 1.4em;
  padding: 0.4em;
`;

const Title = styled.h2`
  color: black;
  font-size: 2.4em;
`;

const MoneyAmount = styled.p`
  color: black;
  font-size: 2em;
`;

const Category = styled.div`
  color: black;
`;

const TimeLabel = styled.p`
  color: black;
`;

const RecurringLabel = styled.div`
  color: black;
`;

const DeleteButton = styled.button`
  color: black;
  font-size: 2em;
  border: none;
`;

const DeleteImage = styled.img`
  width: 1.2em;
  position: relative;
  top: 0.2em;
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  padding-top: 4em;
  justify-content: center;
  align-items: center;
`;

const MoneyInput = styled.input`
  color: black;
  font-size: 2em;
  width: 6em;
  border: none;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.8em;
`;
export default function TransactionDetailsWindow(props: Readonly<props>) {
    const [isEditForm, setIsEditForm] = useState(false);
    const isRecurring: boolean = props.transaction.referenceId !== "daily_transaction";
    const [isDeleteWindowVisible, setIsDeleteWindowVisible] = useState(false);

    const [moneyInputValue, setMoneyInputValue] = useState<number>(props.transaction.amountOfMoney)

    const TimeElement = isRecurring ? (<RecurringLabel>Recurring Element</RecurringLabel>) : (
        <TimeLabel>Date: {props.transaction.timeLogged}</TimeLabel>);

    function handleClickCloseWindow() {
        setIsEditForm(false);
        props.setIsVisible(false);
    }

    function handleClickEditButton() {
        setIsEditForm(true);
    }

    function handleClickDeleteButton() {
        if (props.transaction.referenceId === "daily_transaction") {
            axios
                .delete("/api/budget-app/" + props.transaction.id)
                .then(() => {
                    props.setTransactions((prevTransactions: Transaction[]) => {
                        return prevTransactions.filter((transaction: Transaction) => transaction.id !== props.transaction.id);
                    });
                    props.setIsVisible(false);
                })
                .catch((error) => {
                    console.error("Fehler beim Löschen", error);
                });
        } else {
            setIsDeleteWindowVisible(true);
        }
    }

    function handleSubmitEditForm(event: React.FormEvent) {
        event.preventDefault();
        console.log("Submit was clicked.")
    }

    function handleClickCancelEdit() {
        setIsEditForm(false);
    }

    if (isEditForm) {
        return <Container $isVisible={props.isVisible}>
                <CloseButton type="button" onClick={handleClickCloseWindow}><CloseImage src={CloseIcon}
                                                                                        alt="Close Button"/></CloseButton>
                <EditForm onSubmit={handleSubmitEditForm}>
                    <MoneyInput type="number" step="0.01" name="amountOfMoney" value={props.transaction.amountOfMoney}/>
                    <input type="text" name="title" value={props.transaction.title}/>
                    <input type="datetime-local" name="timeLogged" value={props.transaction.timeLogged}/>
                    <ButtonContainer>
                        <Button buttonText="Submit" type="submit"/>
                        <Button buttonText="Cancel" onClick={handleClickCancelEdit}/>
                    </ButtonContainer>
                </EditForm>
        </Container>
    }
    return <Container $isVisible={props.isVisible}>
        <Content>
            <DeleteRecurringWindow setIsVisible={setIsDeleteWindowVisible} isVisible={isDeleteWindowVisible}
                                   id={props.transaction.id} referenceId={props.transaction.referenceId}
                                   setTransactions={props.setTransactions}/>
            <CloseButton type="button" onClick={handleClickCloseWindow}><CloseImage src={CloseIcon}
                                                                                    alt="Close Button"/></CloseButton>
            <EditButton type="button" onClick={handleClickEditButton}>Edit</EditButton>
            <MoneyAmount>{formatMoney(props.transaction.amountOfMoney)}€</MoneyAmount>
            <Title>{props.transaction.title}</Title>
            <Category>{props.transaction.transactionCategory}</Category>
            {TimeElement}
            <DeleteButton type="button" onClick={handleClickDeleteButton}>
                <DeleteImage src={DeleteIcon} alt="Delete Button"/>
                Delete
            </DeleteButton>
        </Content>
    </Container>
}