import styled from "styled-components";
import {textColor, XS_SIZE} from "../../../../helpers/constants";

export const ItemsHeader = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
  padding: 20px 30px;

  h1 {
    color: ${textColor};
  }

  @media (max-width: ${XS_SIZE}) {
    font-size: 12px;
  }
`