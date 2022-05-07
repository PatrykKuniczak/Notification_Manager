import {changeOption, closeFilterDropdown, selectFilter, toggleFilterDropdown} from "../../store/store";
import {useDispatch, useSelector} from "react-redux";
import {FilterOption} from "../styles/Items/FilterContainer";
import {useOnClickOutside} from "usehooks-ts";
import {RefObject} from "react";
import {IOptions} from "../../../helpers/interfaces";


const options: IOptions[] = ["A-Z", "Z-A", "Najwcześniejsza Data", "Najpóźniejsza Data"];

const ItemsFunc = (ref: RefObject<HTMLDivElement>) => {
    const dispatch = useDispatch();
    const {filterOption} = useSelector(selectFilter);

    useOnClickOutside(ref, () => dispatch(closeFilterDropdown()));

    const selectFilterOption = (item: IOptions) => {
        dispatch(changeOption(item));
    }

    const displayOptions = () => options.map(item =>
        <FilterOption key={item} onClick={() => selectFilterOption(item)} disabled={item === filterOption}>
            {item}
        </FilterOption>)

    const toggleFilterContainer = () => dispatch(toggleFilterDropdown());

    return {displayOptions, toggleFilterContainer, selectFilterOption}
}


export default ItemsFunc;