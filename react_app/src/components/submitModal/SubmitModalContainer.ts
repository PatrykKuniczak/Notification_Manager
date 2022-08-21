import styled from "styled-components";
import {M_SIZE, S_SIZE, textColor, XS_SIZE} from "../../helpers/constants";


export const SubmitModalContainer = styled.div`
  position: absolute;
  z-index: 1;
  width: calc(100vw - 67px - 24px);
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  @media (max-width: ${M_SIZE}) {
    width: calc(100vw - 50px - 24px);
  }

  @media (max-width: ${S_SIZE}) {
    width: 100vw;
  }
`

export const SubmitModalContent = styled.div`
  position: absolute;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 350px;
  height: 180px;
  padding: 20px;
  border-radius: 20px;
  transform: translate(calc(50vw - (91px / 2) - (350px / 2)), calc(50vh - (180px / 2)));
  background-color: #5c30f8;

  @media (max-width: ${M_SIZE}) {
    width: 300px;
    height: 160px;
    transform: translate(calc(50vw - (74px / 2) - (300px / 2)), calc(50vh - (160px / 2)));
  }

  @media (max-width: ${S_SIZE}) {
    width: 300px;
    height: 160px;
    transform: translate(calc(50vw - (300px / 2)), calc(50vh - 50px - 24px - (160px / 2)));
  }

  @media (max-width: ${XS_SIZE}) {
    width: 280px;
    height: 150px;
    transform: translate(calc(50vw - (280px / 2)), calc(50vh - 50px - 24px - (150px / 2)));
  }

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

    @media (max-width: ${S_SIZE}) {
      font-size: 1rem;
      padding: 4px;
    }
  }
`

export default SubmitModalContainer;