import {useNavigate} from "react-router-dom";

export default function HomePage() {
    const navigateTo = useNavigate();

    function handleClickNewTransaction() {
        navigateTo("/newtransaction");
    }

    function handleClickAllTransactions() {
        navigateTo("/transactions")
    }

    return <>
        <div>This is the HomePage.</div>
        <button type="button" onClick={handleClickAllTransactions}>See all transactions</button>
        <button type="button" onClick={handleClickNewTransaction}>Add new transaction</button>
    </>
}