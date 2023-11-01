import styled from "styled-components";
import CloseIcon from "../assets/x-mark.svg";
import Button from "./Button.tsx";
import axios from "axios";
import {Transaction} from "../models/TransactionModel.tsx";

export type props = {
    // eslint-disable-next-line @typescript-eslint/ban-types
    setIsVisible: Function,
    isVisible: boolean,
    id: string,
    referenceId: string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    setTransactions: Function
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
  padding: 50% 1em 1em;
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

const DeleteText = styled.p`
    font-size: 1.2em;
`;

const DeleteButtonContainer = styled.div`
    display: flex;
  justify-content: space-around;
  gap: 0.4em;
`;

export default function DeleteRecurringWindow(props: Readonly<props>) {
    function handleClickCloseWindow() {
        props.setIsVisible(false);
    }

    function handleClickDeleteThisOne() {
        axios.delete("api/budget-app/" + props.id)
            .then(() => {
                props.setTransactions((prevTransactions: Transaction[]) => {
                    return prevTransactions.filter((transaction: Transaction) => transaction.id !== props.id);
                });
                props.setIsVisible(false);
            })
            .catch((error) => {
                console.error("Fehler beim Löschen", error);
            });
    }

    function handleClickDeleteAll() {
        axios.delete("api/budget-app/monthly/" + props.referenceId)
            .then(() => {
                props.setTransactions((prevTransactions: Transaction[]) => {
                    return prevTransactions.filter((transaction: Transaction) => transaction.referenceId !== props.referenceId);
                });
                props.setIsVisible(false);
            })
            .catch((error) => {
                console.error("Fehler beim Löschen", error);
            })
    }
    return <Container $isVisible={props.isVisible}>
        <Window>
            <CloseButton onClick={handleClickCloseWindow}>
                <ButtonImage src={CloseIcon} alt="Close Window Icon"/>
            </CloseButton>
            <DeleteText>You are about to delete a recurring transaction. Do you want to delete just this one or all future transactions like this?</DeleteText>
            <DeleteButtonContainer>
                <Button buttonText="Delete only this" onClick={handleClickDeleteThisOne} />
                <Button buttonText="Delete all" onClick={handleClickDeleteAll}/>
            </DeleteButtonContainer>
        </Window>
    </Container>
}