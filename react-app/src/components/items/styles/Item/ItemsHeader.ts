import styled from "styled-components";
import { textColor } from "../../../../helpers/constants";

export const ItemsHeader = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
  padding: 20px 30px;

  h1 {
    color: ${textColor};
  }
`