import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {changeOption} from "../../../../store/slices/filterSlice";
import {useState} from "react";


const NavbarFunc = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showRegLoginModal, setShowRegLoginModal] = useState(false);

    type IPath = "/active" | "/inactive" | "add-form";

    const setDefaultFilterOptionWithNav = (path: IPath) => {
        dispatch(changeOption("A-Z"));
        navigate(path);
    }

    const changeModalVisibility = () => {
        setShowRegLoginModal(prevState => !prevState);
    }

    return {setDefaultFilterOptionWithNav, navigate, showRegLoginModal, changeModalVisibility};
}


export default NavbarFunc;