import styled from "styled-components";


export const FilterButton = styled.input`
  height: 40px;
  width: 40px;
  filter: invert(73%) sepia(37%) saturate(433%) hue-rotate(229deg) brightness(97%) contrast(92%);

  &:hover {
    opacity: 0.7;
  }
`

export const FilterContainer = styled.div`
  position: relative;
`

export const FilterContent = styled.ul`
  position: absolute;
  z-index: 1;
  left: -235px;
  padding: 25px;
  border-radius: 10px;
  list-style: none;
  background-color: #6929c4;
  color: #e8dbf3;
`

export const FilterOption = styled.li<{ disabled: boolean }>`
  font-size: 1.5rem;
  pointer-events: ${props => props.disabled === true && "none"};
  opacity: ${props => props.disabled === true && 0.4};

  &:not(:last-child) {
    margin-bottom: 10px;
  }

  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`