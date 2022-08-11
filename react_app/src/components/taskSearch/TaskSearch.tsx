import TaskSearchInput from "./styles/TaskSearchContainer";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {filterItems, filterItemsByTerm} from "../../store/slices/itemsSlice";
import {XXS_SIZE} from "../../helpers/constants";


const TaskSearch = ({width}: {width: number}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch<any>();

    useEffect(() => {
        if (searchTerm.length > 0)
            dispatch(filterItemsByTerm(searchTerm));
        else
            dispatch(filterItems("A-Z"));
    }, [dispatch, searchTerm]);

    return (
        <TaskSearchInput type="search" placeholder={width > Number(XXS_SIZE.slice(0, -2)) ? "Wyszukaj zadanie" : "Wyszukaj"}
                         onChange={data => setSearchTerm(data.target.value)}>
        </TaskSearchInput>
    )
}

export default TaskSearch;