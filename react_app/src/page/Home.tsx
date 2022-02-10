import Menu from "../components/sidebar/Menu";
import './Home.module.css';
import {Outlet} from 'react-router-dom'


function Home() {

    return (
        <>
            <Menu/>
            <Outlet/>
        </>
    )
}

export default Home;