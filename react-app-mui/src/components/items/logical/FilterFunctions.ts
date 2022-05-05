import {useState} from "react";


export const DisplayFilter = () => {
    const [show, setShow] = useState(false);

    const display = () => setShow(prevState => !prevState);

    const closeDisplay = () => setShow(false);

    return {show, display, closeDisplay};
}

export const FilteringOption = () => {
    const [option, setOption] = useState("A-Z");

    const changeOption = (newOption: string) => setOption(newOption);

    return {option, changeOption};
}