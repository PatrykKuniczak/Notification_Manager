import * as React from 'react';
import addIcon from "../icons/addIcon.svg";
import itemsIcon from "../icons/itemsIcon.svg";
import avatarIcon from "../icons/avatarIcon.svg";
import logo from "../icons/logo.svg";
import {AddAvatarContainer} from './styles/AddLoginContainer';
import {DisplayTaskContainer, Logo} from './styles/DisplayPart';
import {useLocation} from "react-router-dom";
import {ListElement, NavbarIcon} from './styles/NavbarContainer';
import {NavbarContainer} from './styles/NavbarContainer';
import NavbarFunc from "./NavbarFunc";
import LoginReg from "../../pages/LoginReg";


const Navbar = () => {
    const {pathname} = useLocation();

    const {setDefaultFilterOptionWithNav, navigate, showRegLoginModal, changeModalVisibility} = NavbarFunc();

    return (
        <NavbarContainer>
            <DisplayTaskContainer>
                <Logo src={logo} alt="Logo" onClick={() =>
                    setDefaultFilterOptionWithNav("/active")}/>

                <ListElement>
                    <NavbarIcon src={itemsIcon} alt="Przycisk Aktywnych Zadań" name="active"
                                location={pathname} onClick={() => setDefaultFilterOptionWithNav("/active")}>
                    </NavbarIcon>
                </ListElement>

                <ListElement>
                    <NavbarIcon src={itemsIcon} alt="Przycisk Nie Aktywnych Zadań" name="inactive"
                                location={pathname} onClick={() => setDefaultFilterOptionWithNav("/inactive")}/>
                </ListElement>
            </DisplayTaskContainer>

            <AddAvatarContainer>
                <ListElement>
                    <NavbarIcon src={addIcon} alt="Przycisk Dodawania Zadań" name="add-form"
                                location={pathname} onClick={() => navigate("add-form")}/>
                </ListElement>

                <ListElement>
                    <NavbarIcon src={avatarIcon} alt="Przycisk Avatar - Logowanie i Rejestracja"
                                name="login-register" location={pathname} onClick={() => changeModalVisibility()}/>
                </ListElement>
            </AddAvatarContainer>

            {showRegLoginModal && <LoginReg changeModalVisibility={changeModalVisibility}/>}
        </NavbarContainer>
    );
}

export default Navbar;