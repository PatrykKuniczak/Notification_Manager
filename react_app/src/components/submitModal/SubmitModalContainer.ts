import styled from "styled-components";
import {S_SIZE, textColor} from "../../helpers/constants";


export const SubmitModalContainer = styled.div`
  position: absolute;
  width: calc(100vw - clamp(40px, 6vw, 60px) - 24px);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);

  @media (max-width: ${S_SIZE}) {
    width: 100vw;
  }
`

export const SubmitModalContent = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  z-index: 1;
  width: clamp(280px, 60vw, 400px);
  height: clamp(150px, 25vw, 220px);
  border-radius: 20px;
  padding-inline: 10px;
  background-color: #5c30f8;

  h3 {
    color: ${textColor};
  }

  button {
    align-self: center;
    padding: 7px;
    border: transparent;
    border-radius: 5px;
    font-size: clamp(.9rem, 3vw, 1.3rem);
    font-weight: 700;
    background-color: #dad4fa;
  }
`

export default SubmitModalContainer;