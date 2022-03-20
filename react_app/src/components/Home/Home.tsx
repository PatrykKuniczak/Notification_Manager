import Menu from "../Menu/Menu";
import styles from './Home.module.scss';
import {Outlet} from 'react-router-dom'
import React from "react";


const Home: React.FC = () => {

    return (
        <div className={styles.container}>
            <Menu/>
            <Outlet/>
        </div>
    )
}

export default Home;