import {selectFilter, selectItems} from "../../store/store";
import {useDispatch, useSelector} from "react-redux";
import {FilterOption} from "../styles/Items/FilterContainer";
import {useOnClickOutside} from "usehooks-ts";
import {useLayoutEffect, useRef} from "react";
import {IOptions} from "../../../helpers/interfaces";
import {changeOption, closeFilterDropdown, toggleFilterDropdown} from "../../store/filterSlice";
import {useLocation} from "react-router-dom";
import {getAllItems} from "../../store/itemsSlice";


const options: IOptions[] = ["A-Z", "Z-A", "Najwcześniejsza Data", "Najpóźniejsza Data"];

const ItemsFunc = () => {
    const dispatch = useDispatch<any>();
    const {loading, items} = useSelector(selectItems);
    const {filterOption} = useSelector(selectFilter);
    const {show} = useSelector(selectFilter);
    const ref = useRef(null);
    const checkLocation = useLocation().pathname === "/active";

    useOnClickOutside(ref, () => dispatch(closeFilterDropdown()));

    const selectFilterOption = (item: IOptions) => {
        dispatch(changeOption(item));
    }

    const displayOptions = () => options.map(item =>
        <FilterOption key={item} onClick={() => selectFilterOption(item)} disabled={item === filterOption}>
            {item}
        </FilterOption>)

    const toggleFilterContainer = () => dispatch(toggleFilterDropdown());
    // // const [filter, setFilter] = useState<"A-Z" | "Z-A" | "LATEST-DATE" | "EARLIER-DATE">("A-Z");
    //
    //
    // const eventHandler = (id: number, item?: ITask) => {
    //     const result = item ? Axios.put(`/tasks/${id}`, {
    //         ...item,
    //         important: !item.important
    //     }) : Axios.delete(`/tasks/${id}`);
    //
    //     return result.then(() => {
    //         if (item) {
    //             setItems(prevItems => {
    //                 const itemForEdit = prevItems.filter(task => task.id === id)[0];
    //
    //                 return prevItems.map((item) => {
    //                     return item.id === itemForEdit.id ? ({...item, important: !item.important}) : item;
    //                 })
    //             });
    //         } else
    //             setItems(prevItems => prevItems.filter(task => task.id !== id));
    //     }).catch((err) => {
    //         setErrorOccur(true)
    //         setErrorMessage(err.message)
    //     })
    // }
    //
    //
    useLayoutEffect(() => {
        dispatch(getAllItems(checkLocation));
    }, [checkLocation, dispatch])


    // useEffect(() => {
    //     switch (filter) {
    //         case "A-Z":
    //             return setItems(prevItems => sort(prevItems).asc(item => item.title));
    //         case "Z-A":
    //             return setItems(prevItems => sort(prevItems).desc(item => item.title));
    //         case "EARLIER-DATE":
    //             return setItems(prevItems => sort(prevItems).asc(item => item.notificationDate));
    //         case "LATEST-DATE":
    //             return setItems(prevItems => sort(prevItems).desc(item => item.notificationDate));
    //     }
    // }, [filter, loading])

    return {show, ref, loading, items, displayOptions, toggleFilterContainer, selectFilterOption}
}


export default ItemsFunc;