import Item from "./Item";
import filterIcon from "../icons/filter.svg";
import {Header} from "./styles/Item/ItemsHeader";
import {ItemsList, MainContainer} from "./styles/Items/ItemsContainer";
import {FilterButton, FilterContent} from "./styles/Items/FilterContainer";
import ItemsFunc from "./logic/ItemsFunc";
import CheckEmptiness from "../checkEmptiness/CheckEmptiness";
import ErrorLoadingProvider from "../errorLoadingProvider/ErrorLoadingProvider";
import TaskSearch from "../taskSearch/TaskSearch";
import SearchFilterContainer from "./styles/Items/SearchFilterContainer";
import {CloseSearchBarButton, SearchIcon, TaskSearchContainer} from "../taskSearch/TaskSearchContainer";
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
        <MainContainer>
            <Header>
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
                        <div ref={closeFilterRef}>
                            <FilterButton type="image" src={filterIcon} alt="Przycisk Filtrowania"
                                          onClick={toggleFilterContainer}/>
                            {show && <FilterContent>
                                {displayOptions()}
                            </FilterContent>}
                        </div>
                    }
                </SearchFilterContainer>
            </Header>

            <ItemsList>
                <ErrorLoadingProvider loading={loading} errorOccur={error} errorMessage={errorMessage}>
                    {Boolean(deferredItems.length) ?
                        deferredItems.map(item => <Item key={item.id} item={item} active={active}/>)
                        : <CheckEmptiness/>}
                </ErrorLoadingProvider>
            </ItemsList>
        </MainContainer>
    )
}

export default Items;