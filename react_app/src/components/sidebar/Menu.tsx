import logo from "./icons/logo.svg";
import activeEye from "./icons/activeEye.svg";
import unActiveEye from "./icons/unActiveEye.svg";
import {Link, NavLink} from 'react-router-dom'
import styles from "./Menu.module.scss"
import React, {useState} from "react";
import Offcanvas from 'react-bootstrap/Offcanvas'
import {Button} from "react-bootstrap";
import listIcon from "./icons/listIcon.svg";
import addIcon from "./icons/addIcon.svg";


const ToggleMenu: React.FC<any> = (props) => {
    const {show, handleClose} = props;

    return <Offcanvas className={styles["toggle-menu"]} show={show} onHide={handleClose} backdrop={true}>
        <Offcanvas.Header bsPrefix={styles["toggle-menu-header"]} closeButton/>
        <Offcanvas.Body bsPrefix={styles["toggle-menu-body"]}>
            <Link className={styles.logo} to="/active"><img src={logo} alt="logo"/></Link>
            <ul>
                <li>
                    <NavLink className={({isActive}) => (isActive && styles.active) || ''}
                             to="active">
                        <div className={styles["icon-square"]}/>
                        <img className={styles["icon"]} src={activeEye} alt="openEye"/>
                        <span>Aktywne</span></NavLink>
                </li>

                <li><NavLink className={({isActive}) => (isActive && styles.active) || ''}
                             to="inactive">
                    <div className={styles["icon-square"]}/>
                    <img className={styles["icon"]} src={unActiveEye} alt="closeEye"/>
                    <span>Zarchiwizowane</span></NavLink>
                </li>
            </ul>
        </Offcanvas.Body>
    </Offcanvas>
}

function Menu() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);

    return <aside className={styles.menu}>
            <Button onClick={toggleShow} className={styles["toggle-btn"]}><img src={listIcon} alt="List icon"/></Button>
            <Button className={styles["add-btn"]}><NavLink to={"/add-form"}><img src={addIcon}
                                                                                 alt="List icon"/></NavLink></Button>

        <ToggleMenu show={show} handleClose={handleClose}/>
    </aside>

}


export default Menu;