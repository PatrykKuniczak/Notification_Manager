import Item from "./Item";
import filterIcon from "../icons/filter.svg";
import {ItemsHeader} from "./styles/Item/ItemsHeader";
import {ItemsContainer, ItemsList} from "./styles/Items/ItemsContainer";
import {DisplayFilter, FilteringOption} from "./logical/FilterFunctions";
import {FilterButton, FilterContainer, FilterContent, FilterOption} from "./styles/Items/FilterContainer";
import {useRef} from "react";
import {useOnClickOutside} from "usehooks-ts";


const options = ["A-Z", "Z-A", "Najwcześniejsza Data", "Najpóźniejsza Data"];

const Items = ({active}: { active: boolean }) => {
    const {show, display, closeDisplay} = DisplayFilter();
    const {option, changeOption} = FilteringOption();

    const ref = useRef(null);

    useOnClickOutside(ref, closeDisplay)

    return (<ItemsContainer>
            <ItemsHeader>
                <h1>{active ? "Aktywne" : "Zarchiwizowane"}</h1>
                <FilterContainer ref={ref}>
                    <FilterButton type="image" onClick={display}
                                  src={filterIcon} alt="Przycisk Filtrowania"/>

                    {show && <FilterContent>
                        {options.map(item => <FilterOption key={item} onClick={() => {
                            changeOption(item);
                            closeDisplay();
                        }} disabled={item === option}>{item}</FilterOption>)}
                    </FilterContent>}
                </FilterContainer>
            </ItemsHeader>

            <ItemsList>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
            </ItemsList>
        </ItemsContainer>
    )
}

export default Items;