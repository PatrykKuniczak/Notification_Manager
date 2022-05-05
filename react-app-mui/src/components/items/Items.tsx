import Item from "./Item";
import filterIcon from "../icons/filter.svg";
import {FilterButton, ItemsHeader } from "./styles/Item/ItemsHeader";
import { ItemsContainer, ItemsList } from "./styles/Items/ItemsContainer";


const Items = ({active}: { active: boolean }) => {
    return (<ItemsContainer>
            <ItemsHeader>
                <h1>{active ? "Aktywne" : "Zarchiwizowane"}</h1>
                <FilterButton type="image" src={filterIcon} alt="Przycisk Filtrowania"/>
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