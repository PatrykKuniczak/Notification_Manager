import * as React from 'react';
import NavbarItem from "./NavbarItem.styled";
import activeEye from "../icons/activeEye.svg";
import inactiveEye from "../icons/inactiveEye.svg";
import addIcon from "../icons/addIcon.svg";
import styled from "styled-components";


const NavbarList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;
  margin-top: 40px;
  list-style-type: none;

  @media (max-width: 700px) {
    flex-direction: row;
    margin: 0;
  }
`

const NavbarContainer = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  background: linear-gradient(to right top, #163C94, #1A47AF);

  @media (max-width: 700px) {
    flex-direction: row;
  }
`

const Navbar = () => {
    return (
        <NavbarContainer>
            <NavbarList>
                <NavbarItem src={activeEye} alt={"Active Tasks Button"}/>
                <NavbarItem src={inactiveEye} alt={"Inactive Tasks Button"}/>
            </NavbarList>

            <NavbarList>
                <NavbarItem src={addIcon} alt={"Add Tasks Button"}/>
            </NavbarList>
        </NavbarContainer>
    );
}

export default Navbar;