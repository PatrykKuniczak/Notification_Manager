import styled from "styled-components";
import {VERY_SMALL_SIZE, XS_SIZE} from "../../../../helpers/constants";


export const TextContainer = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  width: 63vw;
  padding-inline: 10px;
  gap: 10px;
  color: #272527;
`

export const TextElement = styled.span`
  width: 45%;
  font-size: clamp(.9rem, 1.25vw, 2rem);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media (max-width: ${XS_SIZE}) {
    width: 100%;
    max-width: 95px;
    
    &:nth-child(2) {
      display: none;
    }
  }
`

export const DateElement = styled(TextElement)`
  display: inline-flex;
  justify-content: center;
  width: 10%;
  min-width: fit-content;

  @media (max-width: ${XS_SIZE}) {
    width: 30%;
  }

  @media (max-width: ${VERY_SMALL_SIZE}) {
    display: none;
  }
`