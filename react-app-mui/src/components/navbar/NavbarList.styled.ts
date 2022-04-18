import styled from "styled-components";


const NavbarList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 2px;
  margin: 0;
  background: linear-gradient(to right top, #163C94, #1A47AF);
  
  div {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    gap: 15px;
  }
`

export default NavbarList;