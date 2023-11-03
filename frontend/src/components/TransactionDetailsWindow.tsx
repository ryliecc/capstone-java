import styled from "styled-components";
import React, {useState} from "react";
import {Transaction} from "../models/TransactionModel.tsx";
import CloseIcon from "../assets/x-mark.svg";
import Button from "./Button.tsx";
import formatMoney from "../hooks/formatMoney.tsx";
import DeleteIcon from "../assets/trash.svg";

export type props = {
    transaction: Transaction,
    isVisible: boolean,
    // eslint-disable-next-line @typescript-eslint/ban-types
    setIsVisible: Function
}

const Container = styled.div<{isVisible: boolean}>`
  position: fixed;
  height: 100%;
  width: 100%;
  top: ${(props) => (props.isVisible ? "0" : "-100%")};
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

const EditButton = styled.button``;

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
export default function TransactionDetailsWindow(props: Readonly<props>) {
    const [isEditForm, setIsEditForm] = useState(false);
    const isRecurring: boolean = props.transaction.referenceId !== "daily_transaction";

    const TimeElement = isRecurring ? (<RecurringLabel>Recurring Element</RecurringLabel>) : (<TimeLabel>Date: {props.transaction.timeLogged}</TimeLabel>);

    function handleClickCloseWindow() {
        props.setIsVisible(false);
    }

    function handleClickEditButton() {
        setIsEditForm(true);
    }

    function handleClickDeleteButton() {

    }

    function handleSubmitEditForm(event: React.FormEvent) {
        event.preventDefault();
    }

    if(isEditForm) {
        return <Container isVisible={props.isVisible}>
            <EditForm onSubmit={handleSubmitEditForm}>
                <Button buttonText="Submit" type="submit"/>
            </EditForm>
        </Container>
    }
    return <Container isVisible={props.isVisible}>
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