import styled from "styled-components";
import {M_SIZE, S_SIZE, textColor, XXS_SIZE} from "../../../helpers/constants";


const activeIconFilter = "invert(78%) sepia(18%) saturate(1106%) hue-rotate(215deg) brightness(98%) contrast(93%)";
const inactiveIconFilter = "invert(64%) sepia(7%) saturate(1065%) hue-rotate(232deg) brightness(97%) contrast(90%)";
const activeStateIconFilter = "invert(95%) sepia(13%) saturate(5868%) hue-rotate(186deg) brightness(104%) contrast(101%)";

export const NavbarContainer = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;
  background-color: #8c4def;

  @media (max-width: ${S_SIZE}) {
    flex-direction: row;
  }
`

export const ListElement = styled.li`
  background: none;
  border: none;
`

export const NavbarIcon = styled.img<{ name: string, location: string }>`
  width: 45px;

  filter: ${props => props.name === "add-form" ? activeIconFilter :
          props.name === "active" ? activeIconFilter : inactiveIconFilter};

  filter: ${props => `/${props.name}` === props.location && activeStateIconFilter};
  pointer-events: ${props => `/${props.name}` === props.location && "none"};

  &:hover {
    opacity: 0.7;
    cursor: ${props => props.name === "add-form" || "active" ? "pointer" : "default"};
  }

  @media (max-width: ${M_SIZE}) {
    width: 40px;
  }

  @media (max-width: ${S_SIZE}) {
    margin-right: ${props => props.name === "add-form" && "20px"};
    margin-left: ${props => props.name === "active" && "20px"};
  }

  @media (max-width: ${XXS_SIZE}) {
    margin-right: ${props => props.name === "add-form" && "10px"};
    margin-left: ${props => props.name === "active" && "10px"};
  }
`

export const UserProfileWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: none;
  z-index: 1;
`

export const UserProfileContainer = styled.div`
  width: 70vw;
  height: 80vh;
  border-radius: 3vw;
  background-color: #53008d;
`

export const UserProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 40px;

  label {
    font-size: 1rem;
    font-weight: bold;
    color: ${textColor};
  }
`

export const Avatar = styled.img`
  width: 150px;
  height: 150px;
`

export const UserProfileInput = styled.input`
  width: 50vw;
  height: 50px;
  border-radius: 1vw;
  padding: 5px;
`