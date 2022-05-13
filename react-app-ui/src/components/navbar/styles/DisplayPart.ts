import styled from "styled-components";
import {M_SIZE, S_SIZE} from "../../../helpers/constants";


export const Logo = styled.img`
  margin-bottom: 30px;

  @media (max-width: ${M_SIZE}) {
    width: 50px;
    height: 50px;
  }

  @media (max-width: ${S_SIZE}) {
    margin-bottom: 0;
  }
  
  &:hover {
    cursor: pointer;
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