import Menu from "../Menu/Menu";
import {Outlet} from 'react-router-dom'
import React from "react";


const Home: React.FC = () => {

    return (
        <div className={"d-flex flex-column"}>
            <Menu/>
            <Outlet/>
        </div>
    )
}

export default Home;