import {selectFilter, selectItems} from "../../store/store";
import {useDispatch, useSelector} from "react-redux";
import {FilterOption} from "../styles/Items/FilterContainer";
import {useOnClickOutside} from "usehooks-ts";
import {useEffect, useLayoutEffect, useRef} from "react";
import {IOptions} from "../../../helpers/interfaces";
import {changeOption, closeFilterDropdown, toggleFilterDropdown} from "../../store/filterSlice";
import {useLocation} from "react-router-dom";
import {filterItems, getAllItems} from "../../store/itemsSlice";


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
    // const eventHandler = (id: number, item?: ITask) => {
    //     const result = item ? Axios.put(`/tasks/${id}`, {
    //         ...item,
    //         important: !item.important
    //     }) : Axios.delete(`/tasks/${id}`);
    useLayoutEffect(() => {
        dispatch(getAllItems(checkLocation));
    }, [checkLocation, dispatch])


    useEffect(() => {
        dispatch(filterItems(filterOption))
    }, [filterOption, dispatch])

    return {show, ref, loading, items, displayOptions, toggleFilterContainer, selectFilterOption}
}


export default ItemsFunc;