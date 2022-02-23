import logo from "./icons/logo.svg";
import activeEye from "./icons/activeEye.svg";
import unActiveEye from "./icons/unActiveEye.svg";
import {Link, NavLink} from 'react-router-dom'
import styles from "./Menu.module.scss"
import React, {useState} from "react";
import Offcanvas from 'react-bootstrap/Offcanvas'
import {Button} from "react-bootstrap";
import listIcon from "./icons/listIcon.svg";


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

            <div className={styles['form-link-container']}>
                <NavLink className={({isActive}) => (isActive && styles.active) || ''}
                         to={"add-form"}>
                    <button className={styles["add-button"]}>
                        <b><i>Dodaj Zadanie</i></b>
                    </button>
                </NavLink>
            </div>
        </Offcanvas.Body>
    </Offcanvas>
}

function Menu() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);

    return <aside className={styles.menu}>

        <Button onClick={toggleShow} className={styles["toggle-btn"]}><img src={listIcon} alt="List icon"/></Button>
        <ToggleMenu show={show} handleClose={handleClose}/>

    </aside>

}


export default Menu;