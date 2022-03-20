import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import styles from "./ToggleMenu.module.scss";
import {NavLink} from "react-router-dom";
import logo from "./icons/logo.svg";
import activeEye from "./icons/activeEye.svg";
import unActiveEye from "./icons/unActiveEye.svg";


const ToggleMenu: React.FC<{ show: boolean, handleClose: () => void }> = ({show, handleClose}) => {

    return <Offcanvas className={styles["toggle-menu"]} show={show} onHide={handleClose} backdrop={true}>
        <Offcanvas.Header bsPrefix={styles["toggle-menu-header"]} closeButton/>
        <Offcanvas.Body bsPrefix={styles["toggle-menu-body"]}>
            <NavLink className={styles.logo} to="/active"><img src={logo} alt="logo"/></NavLink>
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


export default ToggleMenu;