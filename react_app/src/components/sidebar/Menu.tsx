import logo from "./img/logo.svg";
import activeEye from "./img/activeEye.svg";
import unActiveEye from "./img/unActiveEye.svg";
import {Link, NavLink} from 'react-router-dom'
import styles from "./Menu.module.scss"
import React from "react";


function Menu() {

    return (
        <aside className={styles.menu}>
            <Link to="/active"><img src={logo} alt="logo"/></Link>
            <ul>
                <li>
                    <NavLink className={({isActive}) => (isActive && styles.active) || ''}
                             to="active">
                        <div className={styles["iconSquare"]}/>
                        <img className={styles["icon"]} src={activeEye} alt="openEye"/>
                        <span>Aktywne</span></NavLink>
                </li>

                <li><NavLink className={({isActive}) => (isActive && styles.active) || ''}
                             to="unActive">
                    <div className={styles["iconSquare"]}/>
                    <img className={styles["icon"]} src={unActiveEye} alt="closeEye"/>
                    <span>Zarchiwizowane</span></NavLink></li>
            </ul>
        </aside>
    )
}

export default Menu;