import * as React from 'react';
import NavbarList from "./NavbarList.styled";
import NavbarItem from "./NavbarItem.styled";
import activeEye from "../icons/activeEye.svg";
import inactiveEye from "../icons/inactiveEye.svg";
import addIcon from "../icons/addIcon.svg";


const Navbar = () => {
    return (
        <NavbarList>
            <div>
                <NavbarItem src={activeEye} alt={"Active Tasks Button"}/>
                <NavbarItem src={inactiveEye} alt={"Inactive Tasks Button"}/>
            </div>

            <NavbarItem src={addIcon} alt={"Add Tasks Button"}/>
        </NavbarList>
    );
}

export default Navbar;