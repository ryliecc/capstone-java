import styled from "styled-components";
import BackIcon from "../assets/arrow-uturn-left.svg";
import {useNavigate} from "react-router-dom";

const Button = styled.button`
  border-radius: 10px;
  position: absolute;
  padding: 0;
  background-color: #aec8ce;
  border: none;
  cursor: pointer;
  height: 3em;
  width: 3em;
  top: -3.4em;
  left: 0.4em;
  font-size: 1em;
  bottom: 0;
`;

const ButtonImage = styled.img`
  position: absolute;
  left: 0.4em;
  top: 0.4em;
  width: 2.2em;
`;

export default function BackButton() {
    const navigateTo = useNavigate();

    function handleClickBack() {
        navigateTo(-1);
    }
    return (<Button type="button" onClick={handleClickBack}>
        <ButtonImage src={BackIcon} alt="Go Back Button"/>
    </Button>)
}