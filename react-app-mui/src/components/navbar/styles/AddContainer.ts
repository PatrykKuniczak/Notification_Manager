import styled from "styled-components";
import {S_SIZE} from "../../../helpers/constants";


export const AddButtonContainer = styled.ul`
  list-style-type: none;
  margin-bottom: 50px;

  @media (max-width: ${S_SIZE}) {
    flex-direction: row;
    margin: 0;
  }
`