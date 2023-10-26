import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import AppHeader from "../components/AppHeader.tsx";
import Button from "../components/Button.tsx";
import axios from "axios";
import {useEffect} from "react";
import useLocalStorageState from "use-local-storage-state";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  text-align: center;
  gap: 0.8em;
  padding: 0.4em;
  position: relative;
`;

export default function HomePage() {
    const navigateTo = useNavigate();
    const [creatorId, setCreatorId] = useLocalStorageState("creatorId", {defaultValue: "anonymousUser"});

    useEffect(() => {
        axios.get("/api/users/me")
            .then(response => {
                setCreatorId(response.data);
            })
    }, [])

    function handleClickLogin() {
        const host: string = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin;
        window.location.href = host + '/oauth2/authorization/github', '_blank';
    }


    if(creatorId !== "anonymousUser") {
        navigateTo("/dashboard");
    }
    return <>
        <AppHeader headerText="Budget App"/>
        <Main>
            <div>Welcome to the Budget App! Please log in to proceed.</div>
                <Button buttonText="Login" onClick={handleClickLogin}/>
        </Main>
    </>
}