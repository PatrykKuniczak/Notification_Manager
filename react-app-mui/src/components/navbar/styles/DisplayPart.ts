import styled from "styled-components";
import {M_SIZE, S_SIZE} from "../../../helpers/constants";


export const activeIconFilter = "invert(78%) sepia(18%) saturate(1106%) hue-rotate(215deg) brightness(98%) contrast(93%)";
export const inactiveIconFilter = "invert(64%) sepia(7%) saturate(1065%) hue-rotate(232deg) brightness(97%) contrast(90%)";


export const Logo = styled.img`
  margin-bottom: 30px;

  @media (max-width: ${M_SIZE}) {
    width: 50px;
    height: 50px;
  }

  @media (max-width: ${S_SIZE}) {
    margin-bottom: 0;
  }
`

export const DisplayTaskContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 35px;
  list-style-type: none;

  @media (max-width: ${S_SIZE}) {
    flex-direction: row;
    margin: 0;
  }
`