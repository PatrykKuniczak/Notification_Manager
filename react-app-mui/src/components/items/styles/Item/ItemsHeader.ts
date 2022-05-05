import styled from "styled-components";

export const ItemsHeader = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
  padding: 20px 30px;

  h1 {
    color: #DABBF1;
  }
`

export const FilterButton = styled.input`
  height: 40px;
  width: 40px;
  filter: invert(73%) sepia(37%) saturate(433%) hue-rotate(229deg) brightness(97%) contrast(92%);
`