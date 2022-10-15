import styled from "styled-components";
import {S_SIZE} from "../../../helpers/constants";


export const Logo = styled.img`
  margin-bottom: 30px;
  width: clamp(40px, 6vw, 60px);

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
  }
`