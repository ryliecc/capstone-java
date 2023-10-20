export default function HomePage() {

    function handleSubmitForm(event: React.FormEvent) {
        event.preventDefault();
        const formTarget = event.currentTarget as HTMLFormElement;
        console.log(formTarget.elements.namedItem("title").value);
        console.log(formTarget.elements.namedItem("amountOfMoney").value);


    }

    return <>
        <div>This is the HomePage.</div>
        <form onSubmit={handleSubmitForm}>
            <label htmlFor={"title"}>Title:</label>
            <input name={"title"} id={"title"} type={"text"} required/>
            <label htmlFor={"moneyAmount"}>Amount of Money:</label>
            <input name={"amountOfMoney"} id={"moneyAmount"} type={"text"} required/>
            <button type={"submit"}>Submit</button>
        </form>
    </>
}