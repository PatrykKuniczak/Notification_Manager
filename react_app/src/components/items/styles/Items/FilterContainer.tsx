import styled from "styled-components";


export const FilterButton = styled.input`
  height: clamp(35px, 8vw, 45px);
  width: clamp(35px, 8vw, 45px);

  &:hover {
    opacity: 0.7;
  }
`

export const FilterContent = styled.ul`
  position: absolute;
  transform: translate(-70%, 5px);
  display: flex;
  flex-direction: column;
  z-index: 1;
  gap: 5px;
  padding: 12px;
  border-radius: 10px;
  list-style: none;
  color: #e8dbf3;
  background-color: #6929c4;
`

export const FilterOption = styled.li<{ disabled: boolean }>`
  font-size: clamp(.85rem, 2vw, 1.25rem);
  pointer-events: ${props => props.disabled && "none"};
  opacity: ${props => props.disabled && 0.4};

  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`