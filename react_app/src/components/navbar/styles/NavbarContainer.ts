import styled from "styled-components";
import {S_SIZE} from "../../../helpers/constants";


export const NavbarContainer = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;
  background-color: #8c4def;

  @media (max-width: ${S_SIZE}) {
    flex-direction: row;
  }
`

export const ListElement = styled.li`
  background: none;
  border: none;
`

export const NavbarIcon = styled.img<{ name: string, location: string }>`
  width: clamp(40px, 6vw, 50px);

  filter: ${props => `/${props.name}` === props.location && "hue-rotate(220deg)"};
  pointer-events: ${props => `/${props.name}` === props.location && "none"};

  &:hover {
    opacity: 0.7;
    cursor: ${props => props.name === "add-form" || "active" ? "pointer" : "default"};
  }

  @media (max-width: ${S_SIZE}) {
    margin-inline: 1vw;
  }
`