import {selectFilter, selectItems} from "../../../store/store";
import {useDispatch, useSelector} from "react-redux";
import {FilterOption} from "../styles/Items/FilterContainer";
import {useOnClickOutside, useWindowSize} from "usehooks-ts";
import {useDeferredValue, useEffect, useLayoutEffect, useRef, useState} from "react";
import {IOptions} from "../../../helpers/interfaces";
import {changeOption, closeFilterDropdown, toggleFilterDropdown} from "../../../store/slices/filterSlice";
import {useLocation} from "react-router-dom";
import {filterItems, getAllItems} from "../../../store/slices/itemsSlice";
import {VERY_SMALL_SIZE} from "../../../helpers/constants";


const options: IOptions[] = ["A-Z", "Z-A", "Important", "Earlier Date", "Latest Date"];
const translatedOptions = ["A-Z", "Z-A", "Ważne", "Najwcześniejsza Data", "Najpóźniejsza Data"];

const ItemsFunc = () => {
    const dispatch = useDispatch<any>();
    const {loading, items, error, errorMessage} = useSelector(selectItems);
    const {filterOption, show} = useSelector(selectFilter);
    const ref = useRef(null);
    const checkLocation = useLocation().pathname === "/active";
    const deferredItems = useDeferredValue(items);
    const {width} = useWindowSize()
    const [searchBarVisibility, setSearchBarVisibility] = useState(false);

    useOnClickOutside(ref, () => dispatch(closeFilterDropdown()));

    const selectFilterOption = (option: IOptions) => {
        dispatch(changeOption(option));
    }

    const displayOptions = () => options.map(option =>
        <FilterOption key={option} onClick={() => selectFilterOption(option)} disabled={option === filterOption}>
            {translatedOptions[options.indexOf(option)]}
        </FilterOption>)

    const toggleFilterContainer = () => dispatch(toggleFilterDropdown());

    const changeSearchBarVisibility = () => setSearchBarVisibility(prevState => !prevState);

    useLayoutEffect(() => {
        dispatch(getAllItems(checkLocation));
    }, [checkLocation, dispatch])


    useEffect(() => {
        dispatch(filterItems(filterOption));
    }, [filterOption, dispatch])

    useEffect(() => {
        width > Number(VERY_SMALL_SIZE.slice(0, -2)) && setSearchBarVisibility(false);
    }, [width])

    return {
        show,
        ref,
        loading,
        deferredItems,
        displayOptions,
        toggleFilterContainer,
        selectFilterOption,
        error,
        errorMessage,
        width,
        changeSearchBarVisibility,
        searchBarVisibility
    };
}


export default ItemsFunc;