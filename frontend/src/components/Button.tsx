import styled from 'styled-components';

export type props = {
    buttonText : string;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
}

const StyledButton = styled.button`
  align-items: center;
  background-color: #d6c7c7;
  border: 0.2em solid #111;
  border-radius: 0.4em;
  box-sizing: border-box;
  color: #111;
  cursor: pointer;
  display: flex;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  height: 48px;
  justify-content: center;
  line-height: 24px;
  max-width: 100%;
  padding: 1.4em;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:after {
    background-color: #111;
    border-radius: 8px;
    content: "";
    display: block;
    height: 48px;
    left: 0;
    width: 100%;
    position: absolute;
    top: -2px;
    transform: translate(8px, 8px);
    transition: transform 0.2s ease-out;
    z-index: -1;
  }

  &:hover:after {
    transform: translate(0, 0);
  }

  &:active {
    background-color: #ddadad;
    outline: 0;
  }

  &:hover {
    outline: 0;
  }

  @media (min-width: 768px) {
    padding: 0 40px;
  }
`;

export default function Button(props : props) {
    return (<StyledButton type={props.type || 'button'} onClick={props.onClick}>{props.buttonText}</StyledButton>)

}