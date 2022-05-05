import styled from "styled-components";
import {L_SIZE, M_SIZE, S_SIZE, XS_SIZE, XXS_SIZE} from "../../../../helpers/constants";


const activeStarIconFilter = "invert(89%) sepia(29%) saturate(5270%) hue-rotate(351deg) brightness(105%) contrast(89%)";
const inactiveStarIconFilter = "invert(88%) sepia(21%) saturate(419%) hue-rotate(13deg) brightness(83%) contrast(87%)";
const editIconFilter = "invert(71%) sepia(94%) saturate(4821%) hue-rotate(231deg) brightness(102%) contrast(93%)";
const deleteIconFilter = "invert(33%) sepia(59%) saturate(4715%) hue-rotate(248deg) brightness(98%) contrast(92%)";

export const ButtonContainer = styled.div`
  display: inline-flex;
  justify-content: flex-end;
  width: 10%;
  gap: 15px;

  @media (max-width: ${L_SIZE}) {
    width: 15%;
  }

  @media (max-width: ${M_SIZE}) {
    width: 20%;
  }

  @media (max-width: ${S_SIZE}) {
    width: 25%;
  }

  @media (max-width: ${XS_SIZE}) {
    width: 30%;
  }

  @media (max-width: ${XXS_SIZE}) {
    width: 45%;
    gap: 10px;
  }
`

export const IconElement = styled.input<{ name: string, active?: boolean }>`
  width: 35px;
  height: 35px;

  filter: ${props => props.name === "star" ?
          (props.active ? activeStarIconFilter : inactiveStarIconFilter) :
          props.name === "edit" ? editIconFilter : deleteIconFilter};

  @media (max-width: ${L_SIZE}) {
    width: 32px;
    height: 32px;
  }

  @media (max-width: ${XS_SIZE}) {
    width: 28px;
    height: 28px;
  }
`