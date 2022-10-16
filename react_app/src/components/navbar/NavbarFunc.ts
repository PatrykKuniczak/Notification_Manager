import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {changeOption} from "../../store/slices/filterSlice";


const NavbarFunc = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    type IPath = "/active" | "/inactive" | "add-form";

    const setDefaultFilterOptionWithNav = (path: IPath) => {
        dispatch(changeOption("A-Z"));
        navigate(path);
    }

    return {setDefaultFilterOptionWithNav, navigate};
}


export default NavbarFunc;