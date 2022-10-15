import styled from "styled-components";
import {textColor} from "../../helpers/constants";


const DeletePopUpContainer = styled.div`
  width: clamp(130px, 20vw, 300px);
  position: absolute;
  z-index: 1;
  padding: 10px;
  font-size: clamp(.7rem, 2vw, 1rem);
  border-radius: 10px;
  color: ${textColor};
  background-color: #6929c4;
  opacity: 1;
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
    background-color: ${props => props.buttonType === "close" ? "rgba(136,136,136,0.75)" : "rgba(255,0,0,0.75)"};
  }
`

export default DeletePopUpContainer;