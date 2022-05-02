import styled from "styled-components";


const HomeContainer = styled.div`
  display: flex;
  min-height: 100vh;
  
  @media(max-width: 700px){
    flex-direction: column;
  }
`

export default HomeContainer;