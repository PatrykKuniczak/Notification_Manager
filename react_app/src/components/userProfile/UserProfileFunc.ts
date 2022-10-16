import {useRef, useState} from "react";
import {useOnClickOutside} from "usehooks-ts";


const UserProfileFunc = () => {

    const ref = useRef(null);
    const [showProfile, setShowProfile] = useState(false);

    const changeProfileModalVisibility = () => setShowProfile(prevState => !prevState);

    useOnClickOutside(ref, changeProfileModalVisibility);

    return {showProfile, changeProfileModalVisibility, ref}
}

export default UserProfileFunc;