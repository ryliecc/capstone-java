import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import AppHeader from "../components/AppHeader.tsx";

export default function HomePage() {
    const navigateTo = useNavigate();

    function handleClickNewTransaction() {
        navigateTo("/newtransaction");
    }

    function handleClickAllTransactions() {
        navigateTo("/transactions")
    }

    return <>
        <AppHeader headerText="Home"/>
        <div>This is the HomePage.</div>
        <button type="button" onClick={handleClickAllTransactions}>See all transactions</button>
        <button type="button" onClick={handleClickNewTransaction}>Add new transaction</button>
    </>
}