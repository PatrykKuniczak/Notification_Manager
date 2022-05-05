import styled from "styled-components";
import { S_SIZE } from "../helpers/constants";


const HomeContainer = styled.div`
  display: flex;
  min-height: 100vh;
  
  @media(max-width: ${S_SIZE}){
    flex-direction: column;
  }
`

export default HomeContainer;