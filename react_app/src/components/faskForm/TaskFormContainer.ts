import styled, {css} from "styled-components";
import {ItemsList} from "../items/styles/Items/ItemsContainer";
import {S_SIZE} from "../../helpers/constants";


const Form = styled(ItemsList).attrs({
    as: "form"
})<{ onSubmit: any }>`
  height: calc(100vh - 82.5px);
  gap: 45px;

  @media (max-width: ${S_SIZE}) {
    max-height: calc(100vh - 74px - 40px);
  }
`

export const Label = styled.label<{ error: string | undefined }>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  font-size: clamp(1.25rem, 4vw, 1.5rem);
  color: #fff;

  &::after {
    ${props => props.error && css`
      content: "${props.error}";
    `}
    position: absolute;
    left: 80px;
    padding: 5px;
    border-radius: 5px;
    font-size: clamp(.7rem, 2.5vw, 1rem);
    background-color: #ba0404;
  }
`

export const Input = styled.input<{ border?: boolean | null }>`
  height: 35px;
  padding-inline: 10px;
  font-size: 1.3rem;
  border-radius: 10px;
  outline: ${props => props.border === null ? "transparent" : props.border ? "1px solid #00ff00" : "1px solid #ff0000"};
  opacity: ${props => props.disabled ? "0.8" : "1"};
  box-shadow: 0 0 0.8em 0.1em #56018c;
  background-color: #f8f3ff;

  &:hover {
    opacity: ${props => props.disabled ? "" : "0.9"};
  }

  &:focus-visible {
    outline: transparent;
  }
`

export const Switch = styled(Input)<{ disabled: boolean }>`
  z-index: 1;
  width: 60px;
  height: 30px;
  opacity: 0;
  border-radius: 15px;
  cursor: pointer;
  pointer-events: ${props => props.disabled && "none"};

  &:hover {
    opacity: 0;
  }
`

export const Slider = styled.span<{ active: boolean, disabled: boolean }>`
  position: absolute;
  top: 50px;
  display: block;
  height: 30px;
  width: 60px;
  cursor: pointer;
  border-radius: 15px;
  outline: 2px solid #6700A2;
  opacity: ${props => props.disabled && "0.8"};
  box-shadow: 0 0 1.2rem 0.2em #5a018c;
  background-color: ${props => props.active ? "#9958fd" : "#BAB5BF"};
  pointer-events: ${props => props.disabled && "none"};

  &::before {
    content: "";
    position: absolute;
    top: 3px;
    left: 10px;
    display: block;
    width: 20px;
    height: 20px;
    border: ${props => props.active ? "#7806AB 2px solid" : "#8B868D 2px solid"};
    border-radius: 30%;
    transition: transform 0.4s ease-in-out;
    transform: ${props => props.active ? "translateX(16px)" : "translateX(0)"};
    background-color: ${props => props.active ? "#AD10EE" : "#f0e2f8"};
  }

  &:hover {
    opacity: ${props => !props.disabled && (props.active ? "0.7" : "0.9")};
  }
`
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 30px;
`

export const Button = styled.button`
  padding: 5px;
  font-size: clamp(1rem, 2vw, 1.2rem);
  border-radius: 10px;
  background-color: #e4b9fd;

  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }
`

export default Form;