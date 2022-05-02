import Navbar from "../components/navbar/Navbar";
import {Outlet} from "react-router-dom";
import HomeContainer from "./HomeContainer.styled";


const Home = () => {
    return (<HomeContainer>
        <Navbar/>
        <Outlet/>
    </HomeContainer>)
}

export default Home;