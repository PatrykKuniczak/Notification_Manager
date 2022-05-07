import {changeOption} from "../../../store/store";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";


const NavbarFunc = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    type IPath = "/active" | "/inactive" | "add-form";

    const setDefaultFilterOptionWithNav = (path: IPath) => {
        dispatch(changeOption("A-Z"));
        navigate(path);
    }

    return {setDefaultFilterOptionWithNav};
}


export default NavbarFunc;