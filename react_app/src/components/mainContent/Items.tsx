import styles from "./Items.module.scss";
import React, {useCallback, useEffect, useState} from "react";
import star from "./icons/star.svg";
import deleteIcon from "./icons/delete.svg";
import {useLocation} from "react-router-dom";
import Axios from "axios";
import {Task} from "../helpers/interfaces/Task";
import {CirclesWithBar} from "react-loader-spinner";


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
    const [loading, setLoading] = useState<Boolean>(true);
    const [errorOccur, setErrorOccur] = useState<Boolean>(false);


    const fetchAll = useCallback(() => {
        return Axios.get("/tasks/all").then(({data}) => {
            setItems(data);
            setLoading(false);
        }).catch(() => setErrorOccur(true));
    }, []);

    const className = !props.active ? styles['main-content']
        : [styles['main-content'], styles['main-content--active']].join(' ');

    const importantHandler = async (id: number, item: { title: string, description: string, important: boolean }) => {
        await Axios.put(`/tasks/${id}`, {...item, important: !item.important});
        return await fetchAll();
    }

    const deleteHandler = useCallback(async (id: number) => {
        await Axios.delete(`/tasks/${id}`);
        return await fetchAll();
    }, [fetchAll])

    useEffect(() => {
        fetchAll().then()
    }, [fetchAll]);


    return <div className={className}>
        <h1>{location.pathname === "/active" ? "Aktywne" : "Zarchiwizowane"}</h1>

        {!errorOccur ? !loading ? <Table>
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
        </Table> : <CirclesWithBar
            color="#2d74e0"
            outerCircleColor="#2678e1"
            innerCircleColor="#4987f3"
            barColor="#75716c"
        /> : <h3 className={styles["error-message"]}>"Wystąpił problem, podczas łączenia z serwerem."</h3>}
    </div>
}

export default Items;