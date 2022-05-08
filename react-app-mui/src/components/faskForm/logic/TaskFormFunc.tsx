import {useState} from "react";
import {useNavigate} from "react-router-dom";


const TaskFormFunc = (type: "display" | "add" | "edit") => {
    const [active, setActive] = useState(false);
    const navigate = useNavigate();

    const typesList = ["Wybierz opcję", "Aktywność fizyczna", "Sport", "Gotowanie"];

    const changeImportant = () => {
        type !== "display" && setActive(prevState => !prevState);
    }

    const navAhead = () => {
        const path = type === "add" || type === "edit" ? "/active" : "/edit-form";
        navigate(path);
    }

    const confirmButtonType = () => {
        if (type === "display")
            return "button";
        else
            return "submit";
    };

    const displayTypes = () => typesList.map(item => <option key={item} value={item}>{item}</option>)


    return {active, changeImportant, navAhead, confirmButtonType, displayTypes};
}

export default TaskFormFunc;