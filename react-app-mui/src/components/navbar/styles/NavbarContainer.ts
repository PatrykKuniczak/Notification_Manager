import styled from "styled-components";
import {M_SIZE, S_SIZE, XXS_SIZE} from "../../../helpers/constants";
import {addIconFilter} from "./AddPart";
import {activeIconFilter, inactiveIconFilter} from "./DisplayPart";


export const NavbarContainer = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: #8c4def;

  @media (max-width: ${S_SIZE}) {
    flex-direction: row;
  }
`

export const ListElement = styled.li`
  background: none;
  border: none;
  cursor: pointer;
`

export const NavbarIcon = styled.img<{ name: string }>`
  width: 45px;

  filter: ${props => props.name === "add" ?
    addIconFilter : props.name === "active" ?
        activeIconFilter : inactiveIconFilter
};

  @media (max-width: ${M_SIZE}) {
    width: 40px;
  }

  @media (max-width: ${S_SIZE}) {
    margin-right: ${props => props.name === "add" && "20px"};
    margin-left: ${props => props.name === "active" && "20px"};
  }

  @media (max-width: ${XXS_SIZE}) {
    margin-right: ${props => props.name === "add" && "10px"};
    margin-left: ${props => props.name === "active" && "10px"};
  }
`