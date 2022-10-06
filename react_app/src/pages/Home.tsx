import Navbar from "../components/navbar/Navbar";
import {Outlet} from "react-router-dom";
import styled from "styled-components";
import {S_SIZE} from "../helpers/constants";


const HomeContainer = styled.div`
  display: flex;
  min-height: 100vh;

  @media (max-width: ${S_SIZE}) {
    flex-direction: column;
  }
`

const Home = () => {
    return (<HomeContainer>
        <Navbar/>
        <Outlet/>
    </HomeContainer>)
}

export default Home;