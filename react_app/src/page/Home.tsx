import Menu from "../components/sidebar/Menu";
import styles from './Home.module.scss';
import {Outlet} from 'react-router-dom'


function Home() {

    return (
        <div className={styles.container}>
            <Menu/>
            <Outlet/>
        </div>
    )
}

export default Home;