import AppHeader from "../components/AppHeader.tsx";
import Button from "../components/Button.tsx";
import Background from "../components/Background.tsx";
import {Main} from "../components/Main.tsx";
import {useNavigate} from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import {useEffect} from "react";
import axios from "axios";

export default function HomePage() {
    const navigateTo = useNavigate();
    const [creatorId, setCreatorId] = useLocalStorageState("creatorId", {defaultValue: "anonymousUser"});

    useEffect(() => {
        axios.get("api/users/me")
            .then((response) => {
                setCreatorId(response.data);
                if(response.data !== "anonymousUser"){
                    navigateTo("/dashboard");
                }
            })
    }, []);

    function handleClickLogin() {
        if(creatorId === "anonymousUser") {
            const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin;
            window.location.href = host + '/oauth2/authorization/github';
        } else {
            navigateTo("/dashboard");
        }

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