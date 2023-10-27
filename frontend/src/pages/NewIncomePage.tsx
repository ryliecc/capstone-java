import NewTransactionPage from "./NewTransactionPage.tsx";


export default function NewIncomePage() {
    return <>
        <NewTransactionPage titleText="Where did you get your money from?" moneyText="How much money did you get?" headerText="Add income" isExpense={false}/>
    </>
}