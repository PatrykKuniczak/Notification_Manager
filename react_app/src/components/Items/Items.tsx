import React, {useEffect, useLayoutEffect, useState} from "react";
import star from "./icons/star.svg";
import editIcon from "./icons/edit.svg";
import filterIcon from "./icons/filter.svg";
import {useLocation, useNavigate} from "react-router-dom";
import Axios from "axios";
import {ITask} from "../../helpers/Interfaces";
import ErrorLoadingProvider from "../ErrorLoadingProvider/ErrorLoadingProvider";
import CheckEmptiness from "../CheckEmptiness/CheckEmptiness";
import dateFormat from "dateformat";
import {Dropdown} from "react-bootstrap";
import styles from "./Items.module.scss";
import {sort} from "fast-sort";
import DeleteHint from "../DeleteHint/DeleteHint";


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
    const [filter, setFilter] = useState<"A-Z" | "Z-A" | "LATEST-DATE" | "EARLIER-DATE">("A-Z");


    const eventHandler = (id: number, item?: ITask) => {
        const result = item ? Axios.put(`/tasks/${id}`, {
            ...item,
            important: !item.important
        }) : Axios.delete(`/tasks/${id}`);

        return result.then(() => {
            if (item) {
                setItems(prevItems => {
                    const itemForEdit = prevItems.filter(task => task.id === id)[0];

                    return prevItems.map((item) => {
                        return item.id === itemForEdit.id ? ({...item, important: !item.important}) : item;
                    })
                });
            } else
                setItems(prevItems => prevItems.filter(task => task.id !== id));
        }).catch((err) => {
            setErrorOccur(true)
            setErrorMessage(err.message)
        })
    }


    useLayoutEffect(() => {
        Axios.get("/tasks").then(({data}: { data: ITask[] }) => {
            const actualDate = dateFormat(new Date(), "yyyy-mm-dd'T'HH:MM");
            const filteredData: ITask[] = [];

            data.forEach((item) => {
                const notificationDate = dateFormat(new Date(+item.notificationDate * 1000), "yyyy-mm-dd'T'HH:MM");
                if (checkLocation ? notificationDate > actualDate : notificationDate <= actualDate) {
                    filteredData.push({...item, notificationDate})
                }
            })
            setItems(filteredData);
            setLoading(false);
        }).catch(() => setErrorOccur(true))
    }, [checkLocation])


    useEffect(() => {
        switch (filter) {
            case "A-Z":
                return setItems(prevItems => sort(prevItems).asc(item => item.title));
            case "Z-A":
                return setItems(prevItems => sort(prevItems).desc(item => item.title));
            case "EARLIER-DATE":
                return setItems(prevItems => sort(prevItems).asc(item => item.notificationDate));
            case "LATEST-DATE":
                return setItems(prevItems => sort(prevItems).desc(item => item.notificationDate));
        }
    }, [filter, loading])


    return <div className={styles['main-content']}>
        <div className={"d-flex justify-content-between mb-5"}>
            <h1>{checkLocation ? "Aktywne" : "Zarchiwizowane"}</h1>

            <Dropdown bsPrefix={"d-flex dropdown"}>
                <Dropdown.Toggle variant={"none"} id="dropdown-basic">
                    <img src={filterIcon} alt="Filtering button"/>
                </Dropdown.Toggle>

                <Dropdown.Menu variant={"dark"}>
                    <Dropdown.Item onClick={() => setFilter("A-Z")} active={filter === "A-Z"}>A-Z</Dropdown.Item>
                    <Dropdown.Item onClick={() => setFilter("Z-A")} active={filter === "Z-A"}>Z-A</Dropdown.Item>
                    <Dropdown.Item onClick={() => setFilter("EARLIER-DATE")} active={filter === "EARLIER-DATE"}>
                        Najwcześniejsza Data</Dropdown.Item>
                    <Dropdown.Item onClick={() => setFilter("LATEST-DATE")} active={filter === "LATEST-DATE"}>
                        Najpóźniejsza Data</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>

        <ErrorLoadingProvider loading={loading} errorOccur={errorOccur} errorMessage={errorMessage}>
            {Boolean(items.length) ? <Table>
                {items.map(({id, title, description, important, taskType, notificationDate}) =>
                    <tr key={id} className={"d-flex justify-content-around align-items-center py-1 px-2"}>
                        <td onClick={() => navigate(`/display/${id}`)}
                            className={checkLocation ? styles["title-active"] : styles.title}>{title}</td>
                        <td onClick={() => navigate(`/display/${id}`)}
                            className={checkLocation ? styles["description-active"] : styles.description}>{description}</td>
                        <td onClick={() => navigate(`/display/${id}`)}
                            className={"pe-3"}>{dateFormat(notificationDate, "yy-mm-dd HH:MM")}</td>
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

                        <td className={"me-1 h-fit-content"} onClick={() => navigate(`/edit-form/${id}`)}>
                            <button type="button"><img src={editIcon} alt="Edit button"/>
                            </button>
                        </td>

                        <td>
                            <DeleteHint id={id!} eventHandler={eventHandler}/>
                        </td>
                    </tr>)}
            </Table> : <CheckEmptiness checkLocation={checkLocation}/>}
        </ErrorLoadingProvider>
    </div>
}

export default Items;