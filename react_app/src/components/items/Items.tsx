import Item from "./Item";
import filterIcon from "../icons/filter.svg";
import {ItemsHeader} from "./styles/Item/ItemsHeader";
import {ItemsContainer, ItemsList} from "./styles/Items/ItemsContainer";
import {FilterButton, FilterContainer, FilterContent} from "./styles/Items/FilterContainer";
import ItemsFunc from "./logic/ItemsFunc";
import CheckEmptiness from "../checkEmptiness/CheckEmptiness";
import ErrorLoadingProvider from "../errorLoadingProvider/ErrorLoadingProvider";
import TaskSearch from "../taskSearch/TaskSearch";
import SearchFilterContainer from "./styles/Items/SearchFilterContainer";


const Items = ({active}: { active: boolean }) => {
    const {displayOptions, toggleFilterContainer, show, ref, deferredItems, error, loading, errorMessage} = ItemsFunc();

    return (
        <ItemsContainer>
            <ItemsHeader>
                <h1>{active ? "Aktywne" : "Zarchiwizowane"}</h1>
                <SearchFilterContainer>
                    <TaskSearch/>
                    <FilterContainer ref={ref}>
                        <FilterButton type="image" src={filterIcon} alt="Przycisk Filtrowania"
                                      onClick={toggleFilterContainer}/>
                        {show && <FilterContent>
                            {displayOptions()}
                        </FilterContent>}
                    </FilterContainer>
                </SearchFilterContainer>
            </ItemsHeader>

            <ItemsList>
                <ErrorLoadingProvider loading={loading} errorOccur={error} errorMessage={errorMessage}>
                    {Boolean(deferredItems.length) ?
                        deferredItems.map(item => <Item key={item.id} item={item} active={active}/>)
                        : <CheckEmptiness/>}
                </ErrorLoadingProvider>
            </ItemsList>
        </ItemsContainer>
    )
}

export default Items;