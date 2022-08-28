import styled, {css} from "styled-components";
import SubmitModalContainer, {SubmitModalContent} from "../submitModal/SubmitModalContainer";
import {M_SIZE, textColor, XXS_SIZE} from "../../helpers/constants";
import {ILoginRegOption} from "./RegLoginModal";


const RegLoginModalContainer = styled(SubmitModalContainer)`
  left: 0;
  top: 0;
  width: 100vw;
`

export const RegLoginInputContainer = styled.form`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  gap: 10px;

  label {
    color: ${textColor};
    font-size: 2rem;

    @media (max-width: ${M_SIZE}) {
      font-size: 1.25rem;
      font-weight: 600;
    }
  }

  input {
    width: 100%;
    height: 30px;
    border-radius: 10px;

    @media (max-width: ${M_SIZE}) {
      height: 25px;
    }
  }
`

export const RegLoginModalContent = styled(SubmitModalContent)`
  width: 600px;
  height: 450px;
  padding: 20px;
  border-radius: 20px;
  transform: translate(calc(50vw - (600px / 2)), calc(50vh - (450px / 2)));
  background-color: #5c30f8;
  gap: 2rem;

  @media (max-width: ${M_SIZE}) {
    width: 400px;
    height: 380px;
    transform: translate(calc(50vw - (400px / 2)), calc(50vh - (380px / 2)));
  }

  @media (max-width: ${XXS_SIZE}) {
    width: 300px;
    height: 75vh;
    transform: translate(calc(50vw - (300px / 2)), calc(50vh - (75vh / 2)));
  }
`

export const RegLoginHeader = styled.header`
  display: flex;
  justify-content: space-around;
  color: ${textColor};
  position: relative;
`

const LogRegH1 = styled.h1<{ loginRegOption: ILoginRegOption }>`
  cursor: default;
  text-underline-offset: 10px;

  :hover {
    text-decoration: underline;
    cursor: pointer;
  }

  @media (max-width: ${XXS_SIZE}) {
    font-size: 1.25rem;
  }
`

export const Login = styled(LogRegH1)`
  ${props => props.loginRegOption === "login" && css`
    text-decoration: underline;
  `}
`

export const Register = styled(LogRegH1)`
  ${props => props.loginRegOption === "register" && css`
    text-decoration: underline;
  `}
`

export const LoginRegisterButton = styled.button`
  display: flex;
  align-items: center;
  margin-top: 10px;
  height: 30px;
`


export default RegLoginModalContainer;