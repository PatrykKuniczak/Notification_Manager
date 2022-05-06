import Item from "./Item";
import filterIcon from "../icons/filter.svg";
import {ItemsHeader} from "./styles/Item/ItemsHeader";
import {ItemsContainer, ItemsList} from "./styles/Items/ItemsContainer";
import {FilterButton, FilterContainer, FilterContent} from "./styles/Items/FilterContainer";
import {useRef} from "react";
import {useSelector} from "react-redux";
import {selectFilter} from "../store/store";
import ItemsFunc from "./logical/Items/ItemsFunc";


const Items = ({active}: { active: boolean }) => {
    const ref = useRef(null);

    const {show} = useSelector(selectFilter);
    const {displayOptions, toggleFilterContainer} = ItemsFunc(ref);


    return (<ItemsContainer>
            <ItemsHeader>
                <h1>{active ? "Aktywne" : "Zarchiwizowane"}</h1>
                <FilterContainer ref={ref}>
                    <FilterButton type="image" src={filterIcon} alt="Przycisk Filtrowania"
                                  onClick={toggleFilterContainer}/>
                    {show && <FilterContent>
                        {displayOptions()}
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