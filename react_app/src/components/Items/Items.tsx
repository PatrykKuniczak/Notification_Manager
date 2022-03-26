import styles from "./Items.module.scss";
import React, {useCallback, useEffect, useState} from "react";
import star from "../TaskForm/icons/star.svg";
import deleteIcon from "../TaskForm/icons/delete.svg";
import {NavLink, useLocation} from "react-router-dom";
import Axios from "axios";
import {ITask} from "../helpers/Interfaces";
import {CirclesWithBar} from "react-loader-spinner";


const Table: React.FC = (props) => {

    return <table>
        <tbody>
        {props.children}
        </tbody>
    </table>
}

// TODO: WŁĄCZANIE EDYCJI PO KLIKNIĘCIU NA ITEM

const Items: React.FC<{ active: boolean }> = ({active}) => {
    const location = useLocation();
    const [items, setItems] = useState<ITask[]>([]);
    const [loading, setLoading] = useState<Boolean>(true);
    const [errorOccur, setErrorOccur] = useState<Boolean>(false);


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

    const contentSwitcher = () => {
        if (errorOccur) {
            return <h3 className={styles["error-message"]}>Wystąpił problem, podczas łączenia z serwerem.</h3>;
        } else if (loading) {
            return <CirclesWithBar
                color="#2d74e0"
                outerCircleColor="#2678e1"
                innerCircleColor="#4987f3"
                barColor="#75716c"
            />
        } else if (items.length === 0) {
            if (location.pathname === "/active") {
                return <div className={styles["empty-massage-container"]}>
                    <h3 className={styles["empty-message"]}> Nie ma żadnego zadania, dodaj je: </h3>

                    <NavLink to={"/add-form"}>
                        <button className={styles["add-button"]}>
                            <b><i>Dodaj Zadanie</i></b>
                        </button>
                    </NavLink>
                </div>
            } else {
                return <div className={styles["empty-massage-container"]}>
                    <h3 className={styles["empty-message"]}> Nie ma żadnego zadania.</h3>

                    <NavLink to={"active"}>
                        <button className={styles["add-button"]}>
                            <b><i>Przejdź do aktywnych</i></b>
                        </button>
                    </NavLink>
                </div>
            }

        } else if (!loading) {
            return <Table>
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
            </Table>
        }
    }

    return <div className={className}>
        <h1>{location.pathname === "/active" ? "Aktywne" : "Zarchiwizowane"}</h1>

        {contentSwitcher()}

    </div>
}

export default Items;