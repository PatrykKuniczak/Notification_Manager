import styles from "./Items.module.scss";
import React, {useEffect, useState} from "react";
import star from "./icons/star.svg";
import deleteIcon from "./icons/delete.svg";
import editIcon from "./icons/edit.svg";
import {useLocation, useNavigate} from "react-router-dom";
import Axios from "axios";
import {ITask} from "../helpers/Interfaces";
import ErrorLoadingProvider from "../ErrorLoadingProvider/ErrorLoadingProvider";
import CheckEmptiness from "../CheckEmptiness/CheckEmptiness";


const Table: React.FC = ({children}) => {
    return <table>
        <tbody className="d-flex flex-column gap-3">
        {children}
        </tbody>
    </table>
}


const Items: React.FC = () => {

    const location = useLocation();
    const checkLocation = location.pathname === "/active";
    const navigate = useNavigate();

    const [items, setItems] = useState<ITask[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [errorOccur, setErrorOccur] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [reload, setReload] = useState<boolean>(false);


    const eventHandler = (id: number, item?: ITask) => {
        const result = item ? Axios.put(`/tasks/${id}`, {
            ...item,
            important: !item.important
        }) : Axios.delete(`/tasks/${id}`);

        return result.then(() => setReload(true)).catch((err) => {
            setErrorOccur(true)
            setErrorMessage(err.message)
        })
    }


    useEffect(() => {
        Axios.get("/tasks").then(({data}) => {
            setItems(data);
            setLoading(false);
        }).catch(() => setErrorOccur(true));

        return () => {
            setReload(false)
        }
    }, [reload]);


    return <div className={styles['main-content']}>
        <h1>{checkLocation ? "Aktywne" : "Zarchiwizowane"}</h1>

        <ErrorLoadingProvider loading={loading} errorOccur={errorOccur} errorMessage={errorMessage}>
            {Boolean(items.length) ? <Table>
                {items.map(({id, title, description, important, taskType, notificationDate}) =>
                    <tr key={id} className={"d-flex flex-space-between align-items-center px-2 py-1"}>
                        <td className={styles.title}>{title}</td>
                        <td className={styles.description}>{description}</td>
                        <td className={"me-1"}>
                            <button onClick={() => eventHandler(id!, {
                                title,
                                description,
                                important,
                                taskType,
                                notificationDate
                            })} className={important ? styles["star-button-active"] : ''} type="button"><img
                                src={star} alt="Star,Important button"/>
                            </button>
                        </td>

                        <td className={"me-1"} onClick={() => navigate(`/edit-form/${id}`)}>
                            <button type="button"><img src={editIcon} alt="Edit button"/></button>
                        </td>

                        <td className={"me-1"} onClick={() => eventHandler(id!)}>
                            <button type="button"><img src={deleteIcon} alt="Delete button"/></button>
                        </td>
                    </tr>)}
            </Table> : <CheckEmptiness checkLocation={checkLocation}/>}
        </ErrorLoadingProvider>
    </div>
}

export default Items;