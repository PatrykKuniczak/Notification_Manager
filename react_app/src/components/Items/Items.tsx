import React, {useCallback, useEffect, useState} from "react";
import star from "./icons/star.svg";
import deleteIcon from "./icons/delete.svg";
import editIcon from "./icons/edit.svg";
import filterIcon from "./icons/filter.svg";
import {useLocation, useNavigate} from "react-router-dom";
import Axios from "axios";
import {ITask} from "../helpers/Interfaces";
import ErrorLoadingProvider from "../ErrorLoadingProvider/ErrorLoadingProvider";
import CheckEmptiness from "../CheckEmptiness/CheckEmptiness";
import dateFormat from "dateformat";
import {Dropdown} from "react-bootstrap";
import styles from "./Items.module.scss";
import {sort} from "fast-sort";


const Table: React.FC = ({children}) => {
    return <table>
        <tbody className="d-flex flex-column gap-4">
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
    const [filter, setFilter] = useState<"A-Z" | "Z-A" | "LATEST-DATE" | "EARLIER-DATE">("A-Z");


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

    const filterItems = useCallback((data: ITask[]) => {
        switch (filter) {
            case "A-Z":
                return sort(data).asc(item => item.title)
            case "Z-A":
                return sort(data).desc(item => item.title)
            case "EARLIER-DATE":
                return sort(data).asc(item => item.notificationDate)
            case "LATEST-DATE":
                return sort(data).desc(item => item.notificationDate)
        }
    }, [filter])

    useEffect(() => {
        const filteredData: ITask[] = [];

        Axios.get("/tasks").then(({data}: { data: ITask[] }) => {
            const actualDate = dateFormat(new Date(), "yyyy-mm-dd'T'HH:MM");

            data.forEach((item) => {
                if (checkLocation ? item.notificationDate! > actualDate : item.notificationDate! <= actualDate) {
                    filteredData.push(item)
                }
            })

            setItems(filterItems(filteredData)!);
            setLoading(false);
        }).catch(() => setErrorOccur(true));

        return () => {
            setReload(false)
        }
    }, [reload, location, checkLocation, filter, filterItems]);


    return <div className={styles['main-content']}>
        <div className={"d-flex justify-content-between mb-5"}>
            <h1>{checkLocation ? "Aktywne" : "Zarchiwizowane"}</h1>

            <Dropdown bsPrefix={"d-flex dropdown"}>
                <Dropdown.Toggle variant={"none"} id="dropdown-basic">
                    <img src={filterIcon} alt="Filtering button"/>
                </Dropdown.Toggle>

                <Dropdown.Menu variant={"dark"}>
                    <Dropdown.Item onClick={() => setFilter("A-Z")}>A-Z</Dropdown.Item>
                    <Dropdown.Item onClick={() => setFilter("Z-A")}>Z-A</Dropdown.Item>
                    <Dropdown.Item onClick={() => setFilter("EARLIER-DATE")}>Najwcześniejsza Data</Dropdown.Item>
                    <Dropdown.Item onClick={() => setFilter("LATEST-DATE")}>Najpóźniejsza Data</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>

        <ErrorLoadingProvider loading={loading} errorOccur={errorOccur} errorMessage={errorMessage}>
            {Boolean(items.length) ? <Table>
                {items.map(({id, title, description, important, taskType, notificationDate}) =>
                    <tr key={id} className={"d-flex justify-content-center align-items-center py-1"}>
                        <td className={checkLocation ? styles["title-active"] : styles.title}>{title}</td>
                        <td className={checkLocation ? styles["description-active"] : styles.description}>{description}</td>
                        <td className={"pe-3"}>{dateFormat(notificationDate, "yy-mm-dd HH:MM")}</td>
                        {checkLocation && <td className={"me-1"}>
                            <button onClick={() => eventHandler(id!, {
                                title,
                                description,
                                important,
                                taskType,
                                notificationDate
                            })} className={important ? styles["star-button-active"] : ''} type="button"><img
                                src={star} alt="Star, Important button"/>
                            </button>
                        </td>}

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