import Item from "./Item";
import styled from "styled-components";
import filterIcon from "../icons/filter.svg";


const ItemsHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 100px);
  padding: 20px;
  margin: 20px;
  background-color: #0C40B7;

  @media (max-width: 700px){
    width: calc(100vw - 40px);
  }
`

const Items = () => {
    return (
        <ItemsContainer>
            <ItemsHeader>
                <h1>Aktywne</h1>
                <input type="image" src={filterIcon} alt="Przycisk Filtrowania" height={"40"}/>
            </ItemsHeader>

            <Item/>
        </ItemsContainer>
    )
}

export default Items;