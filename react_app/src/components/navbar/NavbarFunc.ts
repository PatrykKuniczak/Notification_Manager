import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {changeOption} from "../../store/slices/filterSlice";
import {useRef, useState} from "react";
import {useOnClickOutside} from "usehooks-ts";


const NavbarFunc = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ref = useRef(null);

    const [showProfile, setShowProfile] = useState(false);

    type IPath = "/active" | "/inactive" | "add-form";

    const changeProfileModalVisibility = () => setShowProfile(prevState => !prevState);

    const setDefaultFilterOptionWithNav = (path: IPath) => {
        dispatch(changeOption("A-Z"));
        navigate(path);
    }

    useOnClickOutside(ref, changeProfileModalVisibility);

    return {setDefaultFilterOptionWithNav, navigate, showProfile, changeProfileModalVisibility, ref};
}


export default NavbarFunc;