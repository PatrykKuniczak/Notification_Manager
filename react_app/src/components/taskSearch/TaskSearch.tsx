import TaskSearchInput from "./TaskSearchContainer";
import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {filterItems, filterItemsByTerm} from "../../store/slices/itemsSlice";
import {XXS_SIZE} from "../../helpers/constants";
import {selectFilter} from "../../store/store";


type ITaskSearch = { width: number, searchBarVisibility: boolean };

const TaskSearch = forwardRef(({width, searchBarVisibility}: ITaskSearch, searchBarRef) => {
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch<any>();
    const taskSearchRef = useRef<HTMLInputElement>(null!);
    const {filterOption} = useSelector(selectFilter);


    useImperativeHandle(searchBarRef, () => ({
        clearSearchTerm() {
            setSearchTerm("");
        },
        taskSearchFocus() {
            taskSearchRef.current.focus();
        }
    }));

    useEffect(() => {
        if (searchTerm.length > 0)
            dispatch(filterItemsByTerm(searchTerm));
        else
            dispatch(filterItems(filterOption));
    }, [dispatch, searchTerm, filterOption]);


    return (
        <TaskSearchInput type="search" searchBarVisibility={searchBarVisibility}
                         placeholder={width > Number(XXS_SIZE.slice(0, -2)) ? "Wyszukaj zadanie" : "Wyszukaj"}
                         onChange={data => setSearchTerm(data.target.value)} value={searchTerm} ref={taskSearchRef}/>
    )
});

export default TaskSearch;