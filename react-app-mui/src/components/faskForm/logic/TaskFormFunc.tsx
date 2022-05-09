import {useCallback, useLayoutEffect, useMemo, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {ITask} from "../../../helpers/interfaces";
import Axios from "axios";
import dateFormat from "dateformat";


const TaskFormFunc = (type: "display" | "add" | "edit") => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [active, setActive] = useState(false);

    const initialState = useMemo(() => {
        return {date: "", description: "", id: 0, important: false, taskType: "", title: ""}
    }, []);

    const [taskItem, setTaskItem] = useState<ITask>(initialState);

    const getTaskItem = useCallback(async () => {
        if (type !== "add") {
            const {data} = await Axios.get(`/tasks/${id}`);
            setTaskItem({
                ...data,
                date: dateFormat(new Date(+data.date * 1000), "yyyy-mm-dd'T'HH:MM")
            })
            setActive(data.important);
        } else {
            setTaskItem(initialState)
        }
    }, [type, id, initialState])


    useLayoutEffect(() => {
        getTaskItem();
    }, [getTaskItem])

    const typesList = ["Wybierz opcję", "Aktywność fizyczna", "Sport", "Gotowanie"];

    const changeImportant = () => {
        setActive(prevState => !prevState);
    }

    const navAhead = () => {
        const path = type === "add" || type === "edit" ? "/active" : `/edit-form/${id}`;
        navigate(path);
    }

    const confirmButtonType = () => {
        if (type === "display")
            return "button";
        else
            return "submit";
    };

    const title = () =>
        type === "add" ? "Dodawanie Zadania " : type === "edit" ? "Edytowanie Zadania " : "Twoje Zadanie";

    const buttonName = () => type === "add" ? "Dodaj" : type === "edit" ? "Potwierdź" : "Przejdź do edycji";

    const displayTypes = () => typesList.map(item => <option key={item} value={item}>{item}</option>)

    return {taskItem, active, changeImportant, navAhead, confirmButtonType, displayTypes, title, buttonName};
}

export default TaskFormFunc;