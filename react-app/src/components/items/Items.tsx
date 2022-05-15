import Item from "./Item";
import filterIcon from "../icons/filter.svg";
import {ItemsHeader} from "./styles/Item/ItemsHeader";
import {ItemsContainer, ItemsList} from "./styles/Items/ItemsContainer";
import {FilterButton, FilterContainer, FilterContent} from "./styles/Items/FilterContainer";
import ItemsFunc from "./logic/ItemsFunc";
import CheckEmptiness from "../checkEmptiness/CheckEmptiness";
import ErrorLoadingProvider from "../errorLoadingProvider/ErrorLoadingProvider";


const Items = ({active}: { active: boolean }) => {
    const {displayOptions, toggleFilterContainer, show, ref, items, error, loading, errorMessage} = ItemsFunc();

    return (
        <ItemsContainer>
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
                <ErrorLoadingProvider loading={loading} errorOccur={error} errorMessage={errorMessage}>
                    {Boolean(items.length) ?
                        items.map(item => <Item key={item.id} item={item} active={active}/>)
                        : <CheckEmptiness/>}
                </ErrorLoadingProvider>
            </ItemsList>
        </ItemsContainer>
    )
}

export default Items;