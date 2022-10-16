import styled from "styled-components";
import {S_SIZE, textColor} from "../../helpers/constants";


export const UserProfileWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  z-index: 1;
`

const UserProfileContainer = styled.div`
  width: 65vw;
  height: 60vh;
  min-height: 450px;
  border-radius: 3vw;
  background-color: #53008d;

  @media (max-width: ${S_SIZE}) {
    max-height: 300px;
  }
`

export const UserProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 40px;

  label {
    font-size: clamp(1rem, 2vw, 1.3rem);
    font-weight: bold;
    color: ${textColor};
  }
`

export const Avatar = styled.img`
  width: clamp(70px, 10vw, 100px);
  height: clamp(70px, 10vw, 100px);
`

export const UserProfileInput = styled.input`
  width: 50vw;
  height: clamp(30px, 5vw, 50px);
  border-radius: 1vw;
  padding: 5px;
`

export default UserProfileContainer;