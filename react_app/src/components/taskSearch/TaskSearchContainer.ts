import styled from "styled-components";
import {VERY_SMALL_SIZE} from "../../helpers/constants";


export const TaskSearchContainer = styled.div`
  display: flex;
  gap: 10px;
`

const TaskSearchInput = styled.input<{ searchBarVisibility: boolean }>`
  width: clamp(120px, 28vw, 250px);
  height: 40px;
  border-radius: 5px;
  background-color: #e0dede;
  padding-left: 10px;

  &::placeholder {
    color: #000;
    font-weight: bold;
  }

  @media (max-width: ${VERY_SMALL_SIZE}) {
    width: ${props => props.searchBarVisibility && "calc(100vw - 100px)"};
  }
`

export const SearchIcon = styled.img<{ active: boolean }>`
  height: 28px;
  width: 28px;
  align-self: center;
  margin-left: ${props => !props.active && "10px"};
  border-radius: 4px;
`

export const CloseSearchBarButton = styled.img`
  display: inline-flex;
  align-self: center;
  width: 28px;
  height: 28px;
`

export default TaskSearchInput;