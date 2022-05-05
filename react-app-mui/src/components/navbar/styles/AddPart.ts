import styled from "styled-components";
import {S_SIZE} from "../../../helpers/constants";


export const addIconFilter = "invert(78%) sepia(18%) saturate(1106%) hue-rotate(215deg) brightness(98%) contrast(93%)";

export const AddButtonContainer = styled.ul`
  list-style-type: none;
  margin-bottom: 50px;

  @media (max-width: ${S_SIZE}) {
    flex-direction: row;
    margin: 0;
  }
`