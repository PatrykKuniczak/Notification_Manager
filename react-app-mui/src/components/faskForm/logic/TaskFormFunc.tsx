import {useCallback, useLayoutEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getItem} from "../../../store/slices/itemsSlice";
import {selectItems} from "../../../store/store";


const TaskFormFunc = (type: "display" | "add" | "edit") => {
    const {id} = useParams();
    const {item} = useSelector(selectItems)
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();

    const [active, setActive] = useState(false);

    const changeActive = useCallback(() => {
        type !== "add" && setActive(item.important);
    }, [type, item.important])

    const getTaskItem = useCallback(async () => {
        id && dispatch(getItem(+id));
    }, [id, dispatch])


    useLayoutEffect(() => {
        const fetchItem = async () => {
            await getTaskItem();
            changeActive();
        }

        fetchItem();
    }, [getTaskItem, changeActive])

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

    const displayTypes = () => typesList.map(item => <option key={item} value={item}>{item}</option>)

    return {item, active, changeImportant, navAhead, confirmButtonType, displayTypes};
}

export default TaskFormFunc;