import styles from "./Items.module.scss";
import React, {ReactNode, useCallback, useEffect, useState} from "react";
import star from "../TaskForm/icons/star.svg";
import deleteIcon from "../TaskForm/icons/delete.svg";
import {useLocation} from "react-router-dom";
import Axios from "axios";
import {ITask} from "../helpers/Interfaces";
import ErrorLoadingProvider from "../ErrorLoadingProvider/ErrorLoadingProvider";
import CheckEmptiness from "../CheckEmptiness/CheckEmptiness";


const Table: React.FC<{ children: ReactNode }> = ({children}) => {
    return <table>
        <tbody>
        {children}
        </tbody>
    </table>
}

// TODO: WŁĄCZANIE EDYCJI PO KLIKNIĘCIU NA ITEM

const Items: React.FC<{ active: boolean }> = ({active}) => {
    const location = useLocation();
    const checkLocation = location.pathname === "/active";

    const [items, setItems] = useState<ITask[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [errorOccur, setErrorOccur] = useState<boolean>(false);


    const fetchAll = useCallback(() => {
        return Axios.get("/tasks").then(({data}) => {
            data.message ? setItems([]) : setItems(data);

            setLoading(false);
        }).catch(() => setErrorOccur(true));
    }, []);

    const className = !active ? styles['main-content']
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
        <h1>{checkLocation ? "Aktywne" : "Zarchiwizowane"}</h1>

        <ErrorLoadingProvider loading={loading} errorOccur={errorOccur}>
            {Boolean(items.length) ? <Table>
                {items.map(({id, title, description, important, taskType, notificationDate}) =>
                    <tr key={id}>
                        <td className={styles.title}>{title}</td>
                        <td className={styles.description}>{description}</td>
                        <td className={styles["star-button-container"]}>
                            <button onClick={importantHandler.bind(this, id!, {
                                title,
                                description,
                                important,
                                taskType,
                                notificationDate
                            })}
                                    className={important ? styles["star-button-active"] : ''} type="button"><img
                                src={star} alt="Star,Important button"/>
                            </button>
                        </td>

                        <td className={styles["delete-button-container"]} onClick={deleteHandler.bind(this, id!)}>
                            <button type="button"><img src={deleteIcon} alt="Delete button"/></button>
                        </td>
                    </tr>)}
            </Table> : <CheckEmptiness checkLocation={checkLocation}/>}
        </ErrorLoadingProvider>
    </div>
}

export default Items;