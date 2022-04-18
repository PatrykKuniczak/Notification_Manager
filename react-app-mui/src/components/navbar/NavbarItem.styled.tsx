import styled from "styled-components";


const NavbarButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  height: 24px;
  cursor: pointer;
`

const NavbarItem = ({src, alt}: { src: string, alt: string }) => {
    return (
        <NavbarButton>
            <img src={src} alt={alt}/>
        </NavbarButton>
    )
}

export default NavbarItem;