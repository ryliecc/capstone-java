import {useNavigate} from "react-router-dom";
import AppHeader from "../components/AppHeader.tsx";
import Button from "../components/Button.tsx";
import axios from "axios";
import {useEffect} from "react";
import useLocalStorageState from "use-local-storage-state";
import Background from "../components/Background.tsx";
import {Main} from "../components/Main.tsx";

export default function HomePage() {
    const navigateTo = useNavigate();
    const [creatorId, setCreatorId] = useLocalStorageState("creatorId", {defaultValue: "anonymousUser"});

    useEffect(() => {
        axios.get("/api/users/me")
            .then(response => {
                setCreatorId(response.data);
                if(response.data !== "anonymousUser") {
                    navigateTo("/dashboard");
                }
            })
    }, [])

    function handleClickLogin() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin;
        window.location.href = host + '/oauth2/authorization/github';
    }


    return <>
        <AppHeader fontsize={2.6} headerText="Budget App"/>
        <Main>
            <Background/>
            <div>Welcome to the Budget App! Please log in to proceed.</div>
                <Button buttonText="Login" onClick={handleClickLogin}/>
        </Main>
    </>
}