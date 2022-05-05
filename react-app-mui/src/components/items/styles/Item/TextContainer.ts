import styled from "styled-components";
import {L_SIZE, M_SIZE, S_SIZE, XS_SIZE, XXS_SIZE} from "../../../../helpers/constants";


export const TextContainer = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  gap: 10px;
  color: #272527;

  @media (max-width: ${L_SIZE}) {
    width: 85%;
  }

  @media (max-width: ${M_SIZE}) {
    width: 80%;
  }

  @media (max-width: ${S_SIZE}) {
    width: 75%;
  }

  @media (max-width: ${XS_SIZE}) {
    width: 70%;
  }

  @media (max-width: ${XXS_SIZE}) {
    width: 55%;
  }
`

export const TextElement = styled.span`
  width: 45%;
  font-size: clamp(1.25rem, 1.5vw, 2rem);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media (max-width: ${L_SIZE}) {
    width: 37.5%;
  }

  @media (max-width: ${XS_SIZE}) {
    width: 90%;

    &:nth-child(2) {
      display: none;
    }
  }

  @media (max-width: ${XXS_SIZE}) {
    width: 100%;
    
    &:last-child {
      display: none;
    }
  }
`

export const DateElement = styled(TextElement)`
  display: inline-flex;
  justify-content: center;
  width: 10%;
  min-width: fit-content;

  @media (min-width: ${L_SIZE}) {
    width: 25%;
  }
`