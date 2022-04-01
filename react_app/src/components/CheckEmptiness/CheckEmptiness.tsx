import styles from "../CheckEmptiness/CheckEmptiness.module.scss";
import {NavLink} from "react-router-dom";
import React from "react";


const CheckEmptiness: React.FC<{ checkLocation: boolean }> = ({checkLocation}) => {
    return <div className={styles["empty-massage-container"]}>
        <h3 className={styles["empty-message"]}> Nie ma żadnego zadania
            {checkLocation && ", dodaj je:"}</h3>

        <NavLink to={checkLocation ? "/add-form" : "/active"}>
            <button className={styles["nav-button"]}>
                <b><i>{checkLocation ? "Dodaj Zadanie" : "Przejdź do aktywnych"}</i></b>
            </button>
        </NavLink>
    </div>
}

export default CheckEmptiness;