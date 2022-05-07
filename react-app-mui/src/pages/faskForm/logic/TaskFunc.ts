import {useState} from "react";
import {useNavigate} from "react-router-dom";


const TaskFunc = (type: "display" | "add" | "edit") => {
    const [active, setActive] = useState(false);
    const navigate = useNavigate();


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

    return {active, changeImportant, navAhead, confirmButtonType};
}

export default TaskFunc;