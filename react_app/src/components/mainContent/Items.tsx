import styles from "./Items.module.scss";
import React, {useCallback, useEffect, useState} from "react";
import star from "./icons/star.svg";
import deleteIcon from "./icons/delete.svg";
import {useLocation} from "react-router-dom";
import Axios from "axios";
import {API_URL} from "../../App";
import {Task} from "../helpers/interfaces/Task";


const Table: React.FC = (props) => {

    return <table>
        <tbody>
        {props.children}
        </tbody>
    </table>
}


const Items: React.FC<{ active: boolean }> = (props) => {
    const location = useLocation();
    const [items, setItems] = useState<Task[]>([]);


    const displayAll = useCallback(() => {
        return Axios.get(API_URL + "/tasks/all").then(({data}) => setItems(data));
    }, []);

    const className = !props.active ? styles['main-content']
        : [styles['main-content'], styles['main-content--active']].join(' ');

    const importantHandler = async (id: number, item: { title: string, description: string, important: boolean }) => {
        await Axios.put(API_URL + `/tasks/${id}`, {...item, important: !item.important});
        return await displayAll();
    }

    const deleteHandler = useCallback(async (id: number) => {
        await Axios.delete(API_URL + `/tasks/${id}`);
        return await displayAll();
    }, [displayAll])


    useEffect(() => {
        displayAll().then(items => items)
    }, [displayAll])


    return <div className={className}>
        <h1>{location.pathname === "/active" ? "Aktywne" : "Zarchiwizowane"}</h1>
        <Table>
            {items.map(({id, title, description, important}) =>
                <tr key={id}>
                    <td className={styles.title}>{title}</td>
                    <td className={styles.description}>{description}</td>
                    <td className={styles["star-button-container"]}>
                        <button onClick={importantHandler.bind(this, id, {title, description, important})}
                                className={important ? styles["star-button-active"] : ''} type="button"><img
                            src={star} alt="Star,Important button"/>
                        </button>
                    </td>

                    <td className={styles["delete-button-container"]} onClick={deleteHandler.bind(this, id)}>
                        <button type="button"><img src={deleteIcon} alt="Delete button"/>
                        </button>
                    </td>
                </tr>)}
        </Table>
    </div>
}

export default Items;