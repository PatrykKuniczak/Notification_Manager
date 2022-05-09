import styled from "styled-components";
import {ItemsContainer, ItemsList} from "../../items/styles/Items/ItemsContainer";
import {S_SIZE} from "../../../helpers/constants";
import {ItemsHeader} from "../../items/styles/Item/ItemsHeader";


export const TaskFormContainer = styled(ItemsContainer)`

`

const Form = styled(ItemsList).attrs({
    as: "form"
})`
  height: calc(100vh - 82.5px);
  gap: 45px;

  @media (max-width: ${S_SIZE}) {
    max-height: calc(100vh - 74px - 40px);
  }
`
export const Title = styled(ItemsHeader)`
`

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

export const SwitchInputGroup = styled(InputGroup)`
  display: flex;
  flex-direction: column;
  position: relative;
`

export const Label = styled.label`
  font-size: 1.5em;
  color: #fff;
`

export const Input = styled.input`
  height: 35px;
  padding-inline: 10px;
  font-size: 1.3rem;
  border-radius: 10px;
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

export const DateInput = styled(Input)`

`

export const Select = styled(Input).attrs({
    as: "select"
})`
  border: black solid 2px;
`

export const Switch = styled(Input)`
  width: 0;
  height: 0;
  opacity: 0;
  cursor: pointer;
`

export const Slider = styled.span<{ active: boolean, disabled: boolean }>`
  display: block;
  height: 30px;
  width: 60px;
  position: absolute;
  top: 50px;
  cursor: pointer;
  border-radius: 15px;
  outline: 2px solid #6700A2;
  opacity: ${props => props.disabled && "0.8"};
  box-shadow: 0 0 1.2rem 0.2em #5a018c;
  background-color: ${props => props.active ? "#9958fd" : "#BAB5BF"};
  pointer-events: ${props => props.disabled && "none"};
  
  &::before {
    content: "";
    display: block;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 3px;
    left: 10px;
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
  font-size: 1.25em;
  border-radius: 10px;
  background-color: #e4b9fd;

  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }
`

export default Form;