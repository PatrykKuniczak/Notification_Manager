import styled from "styled-components";


const CheckEmptinessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    color: #DABBF1;
  }
`

export const NavButton = styled.button`
  margin-top: 25px;
  padding: 10px;
  font-weight: 700;
  border: none;
  border-radius: 15px;
  outline: transparent;
  color: #000;
  background-color: #DABBF1;
  
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`

export default CheckEmptinessContainer;