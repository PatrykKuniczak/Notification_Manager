import styled from "styled-components";


const ListElement = styled.li`
  background: none;
  border: none;
  height: 30px;
  cursor: pointer;
`

const NavbarItem = ({src, alt}: { src: string, alt: string }) => {
    return (
        <ListElement>
            <img src={src} alt={alt}/>
        </ListElement>
    )
}

export default NavbarItem;