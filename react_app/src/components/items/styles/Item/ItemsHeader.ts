import styled from "styled-components";
import {textColor} from "../../../../helpers/constants";


export const Header = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
  padding: 20px 30px;
  font-size: clamp(12px, 1.75vw, 1.25rem);


  h1 {
    color: ${textColor};
  }
`