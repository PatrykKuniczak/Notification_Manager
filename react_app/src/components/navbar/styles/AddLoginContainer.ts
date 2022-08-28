import styled from "styled-components";
import {S_SIZE} from "../../../helpers/constants";


export const AddAvatarContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  list-style-type: none;
  margin-bottom: 30px;

  @media (max-width: ${S_SIZE}) {
    flex-direction: row;
    margin: 0;
  }
`