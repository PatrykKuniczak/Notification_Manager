import styled, {css} from "styled-components";
import {textColor} from "../../helpers/constants";
import {ILoginRegOption} from "../../pages/LoginReg";
import {Button, Input, Label} from "../faskForm/TaskFormContainer";


const RegLoginContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #8c4def;
`

export const RegLoginContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: clamp(250px, 40vw, 450px);
  height: clamp(250px, 40vw, 450px);
  border-radius: 20px;
  gap: 10px;
  background-color: #5c30f8;
`

export const RegLoginHeader = styled.header`
  display: flex;
  justify-content: space-around;
  color: ${textColor};
`

export const LogRegH1 = styled.h1<{ loginRegOption: ILoginRegOption }>`
  text-underline-offset: 12px;
  font-size: clamp(1rem, 2vw, 1.75rem);

  ${props => props.loginRegOption === "login" ? css`
    :first-child {
      text-decoration: underline;
    }
  ` : css`
    :nth-child(2) {
      text-decoration: underline;
    }`
  }
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`

export const RegLoginInputContainer = styled.form<{ loginRegOption: ILoginRegOption }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.loginRegOption === "login" ? "1rem" : ".5rem"};
`

export const RegLogLabel = styled(Label)`
  color: ${textColor};
  font-size: clamp(.75rem, 2vw, 1.5rem);
`

export const RegLogInput = styled(Input)`
  width: 90%;
  height: clamp(.75rem, 2vw, 1.5rem);
  border-radius: 10px;
`

export const SubmitMessage = styled.span`
  font-size: 1.5rem;
  color: #e72004;
`
export const SubmitButton = styled(Button)`
  font-size: clamp(12px, 2.5vw, 1.5rem);
`

export default RegLoginContainer;