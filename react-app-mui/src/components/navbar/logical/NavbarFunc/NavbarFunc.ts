import {changeOption} from "../../../store/store";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";


const NavbarFunc = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const setDefaultFilterOptionWithNav = (path: "/active" | "/inactive") => {
        dispatch(changeOption("A-Z"));
        navigate(path);
    }

    return {setDefaultFilterOptionWithNav};
}


export default NavbarFunc;