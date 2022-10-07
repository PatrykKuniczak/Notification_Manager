import styled, {css} from "styled-components";
import {M_SIZE, textColor, XXS_SIZE} from "../../helpers/constants";
import {ILoginRegOption} from "../../pages/LoginReg";
import {Input, Label} from "../faskForm/TaskFormContainer";


const RegLoginContainer = styled.div`
  width: 100vw;
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
  width: 600px;
  height: 450px;
  border-radius: 20px;
  background-color: #5c30f8;

  @media (max-width: ${M_SIZE}) {
    width: 400px;
    height: 380px;
  }

  @media (max-width: ${XXS_SIZE}) {
    width: 300px;
    height: 75vh;
  }
`

export const RegLoginHeader = styled.header`
  display: flex;
  justify-content: space-around;
  color: ${textColor};
`

export const LogRegH1 = styled.h1<{ loginRegOption: ILoginRegOption }>`
  cursor: default;
  text-underline-offset: 10px;

  ${props => props.loginRegOption === "login" ? css`
    :first-child {
      text-decoration: underline;
    }
  ` : css`
    :nth-child(2) {
      text-decoration: underline;
    }`}
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }

  @media (max-width: ${XXS_SIZE}) {
    font-size: 1.25rem;
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
  font-size: 2rem;

  @media (max-width: ${M_SIZE}) {
    font-size: 1.25rem;
    font-weight: 600;
  }
`

export const RegLogInput = styled(Input)`
  width: 90%;
  height: 30px;
  border-radius: 10px;

  @media (max-width: ${M_SIZE}) {
    height: 25px;
  }
`

export const SubmitMessage = styled.span`
  font-size: 1.5rem;
  color: #e72004;
`

export default RegLoginContainer;