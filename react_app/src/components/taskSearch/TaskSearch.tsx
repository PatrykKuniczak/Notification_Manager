import TaskSearchInput from "./styles/TaskSearchContainer";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {filterItems, filterItemsByTerm} from "../../store/slices/itemsSlice";


const TaskSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch<any>();

    useEffect(() => {
        if (searchTerm.length > 0)
            dispatch(filterItemsByTerm(searchTerm));
        else
            dispatch(filterItems("A-Z"));
    }, [dispatch, searchTerm]);

    return (
        <TaskSearchInput type="search" placeholder="Wyszukaj zadanie"
                         onChange={data => setSearchTerm(data.target.value)}>
        </TaskSearchInput>
    )
}


export default TaskSearch;