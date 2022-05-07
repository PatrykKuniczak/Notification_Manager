import {useState} from "react";
import {useNavigate} from "react-router-dom";


const ItemFunc = () => {
    const [active, setActive] = useState(false);
    const navigate = useNavigate();

    const changeImportant = () => {
        setActive(prevState => !prevState);
    }

    const displayFormNav = () => navigate("/display-form");

    const editFormNav = () => navigate("/edit-form");

    return {active, changeImportant, displayFormNav, editFormNav}
}

export default ItemFunc;