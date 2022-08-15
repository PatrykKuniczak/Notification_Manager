import styled from "styled-components";
import {M_SIZE, VERY_SMALL_SIZE, XS_SIZE} from "../../../../helpers/constants";


const SearchFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 30%;

  @media (max-width: ${M_SIZE}){
    width: 40%;
  }

  @media (max-width: ${XS_SIZE}){
    width: 60%;
    margin-left: 25px;
  }
  
  @media (max-width: ${VERY_SMALL_SIZE}){
    width: 65%;
    margin-left: 0;
  }
`


export default SearchFilterContainer;
