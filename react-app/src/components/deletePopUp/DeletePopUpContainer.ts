import styled from "styled-components";
import {textColor, XS_SIZE} from "../../helpers/constants";


const DeletePopUpContainer = styled.div`
  width: 150px;
  position: absolute;
  z-index: 1;
  padding: 10px;
  font-size: 0.6rem;
  border-radius: 10px;
  color: ${textColor};
  background-color: #6929c4;
  opacity: 1;

  @media (max-width: ${XS_SIZE}) {
    width: 120px;
    font-size: 0.5rem;
  }
`

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
`

export const Button = styled.button<{ buttonType: "close" | "delete" }>`
  margin-top: 30px;
  padding: 3px;
  border: transparent;
  border-radius: 4px;
  color: #fff;
  background-color: ${props => props.buttonType === "close" ? "#888888" : "#ff0000"};

  &:hover {
    cursor: pointer;
    background-color: ${props => props.buttonType === "close" ? "rgba(136,136,136,0.85)" : "rgba(255,0,0,0.85)"};
  }

  @media (max-width: ${XS_SIZE}) {
    margin-top: 20px;
    font-size: 0.6rem;
  }
`

export default DeletePopUpContainer;