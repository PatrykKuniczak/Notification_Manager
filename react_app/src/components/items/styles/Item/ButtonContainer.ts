import styled from "styled-components";


const activeStarIconFilter = "invert(89%) sepia(29%) saturate(5270%) hue-rotate(351deg) brightness(105%) contrast(89%)";
const inactiveStarIconFilter = "invert(88%) sepia(21%) saturate(419%) hue-rotate(13deg) brightness(83%) contrast(87%)";
const editIconFilter = "invert(71%) sepia(94%) saturate(4821%) hue-rotate(231deg) brightness(102%) contrast(93%)";
const deleteIconFilter = "invert(33%) sepia(59%) saturate(4715%) hue-rotate(248deg) brightness(98%) contrast(92%)";

export const ButtonContainer = styled.div`
  display: inline-flex;
  justify-content: flex-end;
  gap: 1vw;
`

export const IconElement = styled.input<{ name: string, activeImportant?: boolean, active?: boolean }>`
  max-width: 2.5rem;
  max-height: 2.5rem;
  min-width: 1.25rem;
  min-height: 1.25rem;
  width: 3vw;
  height: 3vw;

  filter: ${props => props.name === "star" ?
          (props.activeImportant ? activeStarIconFilter : inactiveStarIconFilter) :
          props.name === "edit" ? editIconFilter : deleteIconFilter};

  &:first-child {
    pointer-events: ${props => !props.active && "none"};
    opacity: ${props => !props.active && "0.5"};
  }
`