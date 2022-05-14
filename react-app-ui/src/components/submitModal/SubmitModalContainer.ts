import styled from "styled-components";
import {textColor} from "../../helpers/constants";


const SubmitModalContainer = styled.div`
  position: absolute;
  z-index: 1;
  width: calc(100vw - 67px - 24px);
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`

export const SubmitModalContent = styled.div`
  position: absolute;
  z-index: 2;
  display: flex;
  height: 180px;
  width: 350px;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  border-radius: 20px;
  transform: translate(calc(50vw - 67px - 24px - (350px / 2)), calc(50vh - (180px / 2)));
  background-color: #5c30f8;

  h3 {
    color: ${textColor};
  }

  button {
    width: fit-content;
    align-self: center;
    padding: 7px;
    border: transparent;
    border-radius: 5px;
    font-size: 1.2rem;
    font-weight: 700;
    background-color: #dcd5fa;
  }
`

export default SubmitModalContainer;