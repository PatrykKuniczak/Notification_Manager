import * as React from 'react';
import addIcon from "../icons/addIcon.svg";
import itemsIcon from "../icons/itemsIcon.svg";
import logo from "../icons/logo.svg";
import {AddButtonContainer} from './styles/AddPart';
import {DisplayTaskContainer, Logo} from './styles/DisplayPart';
import {NavLink} from "react-router-dom";
import { ListElement, NavbarIcon } from './styles/NavbarContainer';
import { NavbarContainer } from './styles/NavbarContainer';


const Navbar = () => {
    return (
        <NavbarContainer>
            <DisplayTaskContainer>
                <NavLink to="/active">
                    <Logo src={logo} alt="Logo"/>
                </NavLink>
                <ListElement>
                    <NavLink to="/active">
                        <NavbarIcon src={itemsIcon} alt="Przycisk Aktywnych Zadań" name="active"/>
                    </NavLink>
                </ListElement>
                <ListElement>
                    <NavLink to="/inactive">
                        <NavbarIcon src={itemsIcon} alt="Przycisk Nie Aktywnych Zadań" name="inactive"/>
                    </NavLink>
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