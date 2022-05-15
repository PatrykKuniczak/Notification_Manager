import styled from "styled-components";
import {XXS_SIZE} from "../../../../helpers/constants";


export const ListContainer = styled.li`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px 15px;
  border-radius: 15px;
  cursor: pointer;
  background-color: #EAD9F9;

  &:hover {
    background-color: rgba(234, 217, 249, 0.85);
  }

  @media (max-width: ${XXS_SIZE}) {
    gap: 20px;
  }
`