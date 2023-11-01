import styled from "styled-components";
import {useState} from "react";
import MenuIcon from "../assets/bars-3.svg";
import DashboardIcon from "../assets/home.svg"
import TransactionsIcon from "../assets/credit-card.svg";
import CategoriesIcon from "../assets/inbox-stack.svg"

export type props = {
    activePage: string
}

const MenuContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${(props) => (props.isOpen ? '0' : '-300px')};
  width: 300px;
  height: 100%;
  background-color: #ddadad;
  transition: right 0.3s;
  z-index: 1;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
`;

const MenuButton = styled.button`
  border-radius: 10px;
  position: absolute;
  padding: 0;
  background-color: #aec8ce;
  border: none;
  cursor: pointer;
  height: 3em;
  width: 3em;
  top: -3.4em;
  right: 0.4em;
  font-size: 1em;
  bottom: 0;
`;

const CloseMenuButton = styled.button`
  border-radius: 10px;
  position: relative;
  padding: 0;
  background-color: #b88c8c;
  border: none;
  cursor: pointer;
  width: 5em;
  top: -0.8em;
  left: -7em;
  font-size: 1.2em;
  bottom: 0;
`;

const ButtonImage = styled.img`
  position: absolute;
  right: 0.4em;
  top: 0.4em;
  width: 2.2em;
`;

const MenuList = styled.ul`
  list-style: none;
  margin-top: 2em;
`;

const MenuItem = styled.li<{isActive: boolean}>`
  display: flex;
  border-bottom: 1px solid #ccc;
  padding: 15px 15px 15px 3.6em;
  font-size: 1.4em;
  cursor: pointer;
  text-align: center;
  background-color: ${(props) => (props.isActive ? '#b88c8c' : 'transparent')};

  &:last-child {
    border-bottom: none;
  }
`;

const ItemIcon = styled.img`
  position: absolute;
  width: 1.8em;
  left: 0.6em;
`;

export default function AppMenu(props: Readonly<props>) {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };
    return <>
        <MenuButton onClick={toggleMenu}><ButtonImage src={MenuIcon}/></MenuButton>
        <MenuContainer isOpen={isMenuOpen}>
            <CloseMenuButton onClick={toggleMenu}><ButtonImage src={MenuIcon}/></CloseMenuButton>
            <MenuList>
                <MenuItem isActive={props.activePage === "dashboard"}><ItemIcon src={DashboardIcon}/>Dashboard</MenuItem>
                <MenuItem isActive={props.activePage === "transactions"}><ItemIcon src={TransactionsIcon}/>All transactions</MenuItem>
                <MenuItem isActive={props.activePage === "categories"}><ItemIcon src={CategoriesIcon}/>Manage categories</MenuItem>
            </MenuList>
        </MenuContainer>
    </>
}