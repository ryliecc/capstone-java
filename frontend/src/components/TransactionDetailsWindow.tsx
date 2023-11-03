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

const CloseButton = styled.button``;

const CloseImage = styled.img`
  width: 3em;
`;

const EditButton = styled.button`
  color: black;
`;

const Title = styled.h2`
  color: black;
  font-size: 1.4em;
`;

const MoneyAmount = styled.p`
  color: black;
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
`;

const DeleteImage = styled.img`
  width: 3em;
`;

const EditForm = styled.form``;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.8em;
`;
export default function TransactionDetailsWindow(props: Readonly<props>) {
    const [isEditForm, setIsEditForm] = useState(false);
    const isRecurring: boolean = props.transaction.referenceId !== "daily_transaction";
    const [isDeleteWindowVisible, setIsDeleteWindowVisible] = useState(false);

    const TimeElement = isRecurring ? (<RecurringLabel>Recurring Element</RecurringLabel>) : (
        <TimeLabel>Date: {props.transaction.timeLogged}</TimeLabel>);

    function handleClickCloseWindow() {
        props.setIsVisible(false);
        setIsEditForm(false);
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
                <ButtonContainer>
                    <Button buttonText="Submit" type="submit"/>
                    <Button buttonText="Cancel" onClick={handleClickCancelEdit} />
                </ButtonContainer>
            </EditForm>
        </Container>
    }
    return <Container $isVisible={props.isVisible}>
        <DeleteRecurringWindow setIsVisible={setIsDeleteWindowVisible} isVisible={isDeleteWindowVisible}
                               id={props.transaction.id} referenceId={props.transaction.referenceId}
                               setTransactions={props.setTransactions}/>
        <CloseButton type="button" onClick={handleClickCloseWindow}><CloseImage src={CloseIcon}
                                                                                alt="Close Button"/></CloseButton>
        <EditButton type="button" onClick={handleClickEditButton}>Edit</EditButton>
        <Title>{props.transaction.title}</Title>
        <MoneyAmount>{formatMoney(props.transaction.amountOfMoney)}€</MoneyAmount>
        <Category>{props.transaction.transactionCategory}</Category>
        {TimeElement}
        <DeleteButton type="button" onClick={handleClickDeleteButton}>
            <DeleteImage src={DeleteIcon} alt="Delete Button"/>
            Delete
        </DeleteButton>
    </Container>
}