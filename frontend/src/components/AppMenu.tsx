import styled from "styled-components";
import { useState } from "react";
import MenuIcon from "../assets/bars-3.svg";
import DashboardIcon from "../assets/home.svg";
import TransactionsIcon from "../assets/credit-card.svg";
import CategoriesIcon from "../assets/inbox-stack.svg";
import CloseIcon from "../assets/x-mark.svg";
import { useNavigate } from "react-router-dom";

export type props = {
    activePage: string;
};

const MenuContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: ${(props) => (props.isOpen ? "0" : "-100%")}; /* Slide down from the top */
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ddadad;
  transition: top 0.3s; /* Animate the top property */
  z-index: 1;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
`;

const MenuButton = styled.button<{ isOpen: boolean }>`
  border-radius: 10px;
  position: absolute;
  padding: 0;
  background-color: ${(props) => (props.isOpen ? "transparent" : "#aec8ce")};
  border: none;
  cursor: pointer;
  height: 3em;
  width: 3em;
  top: -3.4em;
  right: 0.4em;
  font-size: 1em;
  bottom: 0;
  z-index: 10;
`;

const ButtonImage = styled.img<{ isOpen: boolean }>`
  position: absolute;
  right: 0.4em;
  top: 0.4em;
  width: 2.2em;
  opacity: ${(props) => (props.isOpen ? 0.5 : 1)};
  transition: opacity 0.3s ease;
`;


const MenuList = styled.ul`
  list-style: none;
  margin-top: 4em;
`;

const MenuItem = styled.li<{ isActive: boolean }>`
  display: flex;
  border-bottom: 1px solid #ccc;
  padding: 15px 15px 15px 3.6em;
  font-size: 1.4em;
  cursor: pointer;
  text-align: center;
  background-color: ${(props) => (props.isActive ? "#b88c8c" : "transparent")};

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
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigateTo = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    function handleClickDashboard() {
        navigateTo("/dashboard");
    }

    function handleClickTransactions() {
        navigateTo("/transactions");
    }

    function handleClickCategories() {
        navigateTo("/category-management");
    }

    return (
        <>
            <MenuButton isOpen={isMenuOpen} onClick={toggleMenu}>
                <ButtonImage isOpen={isMenuOpen} src={isMenuOpen ? CloseIcon : MenuIcon} />
            </MenuButton>
            <MenuContainer isOpen={isMenuOpen}>
                <MenuList>
                    <MenuItem isActive={props.activePage === "dashboard"} onClick={handleClickDashboard}>
                        <ItemIcon src={DashboardIcon} /> Dashboard
                    </MenuItem>
                    <MenuItem isActive={props.activePage === "transactions"} onClick={handleClickTransactions}>
                        <ItemIcon src={TransactionsIcon} /> All transactions
                    </MenuItem>
                    <MenuItem isActive={props.activePage === "categories"} onClick={handleClickCategories}>
                        <ItemIcon src={CategoriesIcon} /> Manage categories
                    </MenuItem>
                </MenuList>
            </MenuContainer>
        </>
    );
}
