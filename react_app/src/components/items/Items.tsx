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
import {CloseSearchBarButton, SearchIcon, TaskSearchContainer} from "../taskSearch/styles/TaskSearchContainer";
import {VERY_SMALL_SIZE} from "../../helpers/constants";
import searchIcon from "../icons/searchIcon.svg";
import closeSearchBarArrow from "../icons/closeSearchBarArrow.svg";


const Items = ({active}: { active: boolean }) => {
    const {
        displayOptions,
        toggleFilterContainer,
        show,
        closeFilterRef,
        deferredItems,
        error,
        loading,
        errorMessage,
        width,
        changeSearchBarVisibility,
        searchBarVisibility,
        searchBarRef
    } = ItemsFunc();

    return (
        <ItemsContainer>
            <ItemsHeader>
                {!searchBarVisibility && <h1>{active ? "Aktywne" : "Zarchiwizowane"}</h1>}
                <SearchFilterContainer>
                    <TaskSearchContainer>
                        {(searchBarVisibility || width > Number(VERY_SMALL_SIZE.slice(0, -2))) &&
                            <TaskSearch ref={searchBarRef} width={width} searchBarVisibility={searchBarVisibility}/>}

                        {searchBarVisibility && <CloseSearchBarButton src={closeSearchBarArrow}
                                                                      onClick={async () => {
                                                                          await searchBarRef.current.clearSearchTerm();
                                                                          changeSearchBarVisibility();
                                                                      }}/>}
                    </TaskSearchContainer>

                    {(!searchBarVisibility && width <= Number(VERY_SMALL_SIZE.slice(0, -2))) &&
                        <SearchIcon src={searchIcon} active={active}
                                    onClick={async () => {
                                        await changeSearchBarVisibility();
                                        searchBarRef.current.taskSearchFocus();
                                    }}/>}

                    {!searchBarVisibility &&
                        <FilterContainer ref={closeFilterRef}>
                            <FilterButton type="image" src={filterIcon} alt="Przycisk Filtrowania"
                                          onClick={toggleFilterContainer}/>
                            {show && <FilterContent>
                                {displayOptions()}
                            </FilterContent>}
                        </FilterContainer>
                    }
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