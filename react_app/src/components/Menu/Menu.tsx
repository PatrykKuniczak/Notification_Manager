import {NavLink} from 'react-router-dom'
import styles from "./Menu.module.scss"
import React, {useState} from "react";
import {Button} from "react-bootstrap";
import listIcon from "./icons/listIcon.svg";
import addIcon from "./icons/addIcon.svg";
import ToggleMenu from "./ToggleMenu";


const Menu: React.FC = () => {
    const [show, setShow] = useState(false);
    const toggleShow = () => setShow((s) => !s);

    return <nav className={"m-2 d-inline-flex justify-content-between"}>
        <Button onClick={toggleShow} className={styles["nav-btn"]}><img src={listIcon} alt="List icon"/></Button>
        <Button className={styles["nav-btn"]}><NavLink to={"/add-form"}><img src={addIcon}
                                                                             alt="List icon"/></NavLink></Button>

        <ToggleMenu show={show} handleClose={toggleShow}/>
    </nav>
}


export default Menu;