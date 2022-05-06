import * as React from 'react';
import addIcon from "../icons/addIcon.svg";
import itemsIcon from "../icons/itemsIcon.svg";
import logo from "../icons/logo.svg";
import {AddButtonContainer} from './styles/AddContainer';
import {DisplayTaskContainer, Logo} from './styles/DisplayPart';
import {useLocation} from "react-router-dom";
import {ListElement, NavbarIcon} from './styles/NavbarContainer';
import {NavbarContainer} from './styles/NavbarContainer';
import NavbarFunc from "./logical/NavbarFunc/NavbarFunc";


const Navbar = () => {
    const location = useLocation();

    const {setDefaultFilterOptionWithNav} = NavbarFunc();

    return (
        <NavbarContainer>
            <DisplayTaskContainer>
                <Logo src={logo} alt="Logo" onClick={() =>
                    setDefaultFilterOptionWithNav("/active")
                }/>

                <ListElement>
                    <NavbarIcon src={itemsIcon} alt="Przycisk Aktywnych Zadań" name="active"
                                location={location.pathname} onClick={() => setDefaultFilterOptionWithNav("/active")}>
                    </NavbarIcon>
                </ListElement>

                <ListElement>
                    <NavbarIcon src={itemsIcon} alt="Przycisk Nie Aktywnych Zadań" name="inactive"
                                location={location.pathname}
                                onClick={() => setDefaultFilterOptionWithNav("/inactive")}/>
                </ListElement>
            </DisplayTaskContainer>

            <AddButtonContainer>
                <ListElement>
                    <NavbarIcon src={addIcon} alt={"Przycisk Dodawania Zadań"} name="add"/>
                </ListElement>
            </AddButtonContainer>
        </NavbarContainer>
    );
}

export default Navbar;