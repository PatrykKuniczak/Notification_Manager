import styled from "styled-components";
import {L_SIZE, S_SIZE, VERY_SMALL_SIZE, XS_SIZE, XXS_SIZE} from "../../helpers/constants";


export const TaskSearchContainer = styled.div`
  display: flex;
  gap: 10px;
`

const TaskSearchInput = styled.input<{ searchBarVisibility: boolean }>`
  width: 250px;
  height: 40px;
  border-radius: 5px;
  background-color: #e0dede;
  padding-left: 10px;

  &::placeholder {
    color: #000;
    font-weight: bold;
  }

  @media (max-width: ${L_SIZE}) {
    width: 200px;
  }

  @media (max-width: ${S_SIZE}) {
    width: 150px;
  }

  @media (max-width: ${XS_SIZE}) {
    width: 130px;
  }

  @media (max-width: ${XXS_SIZE}) {
    width: 100px;
  }

  @media (max-width: ${VERY_SMALL_SIZE}) {
    width: ${props => props.searchBarVisibility && "calc(100vw - 100px)"};
  }
`

export const SearchIcon = styled.img<{ active: boolean }>`
  height: 35px;
  width: 35px;
  align-self: center;
  margin-left: ${props => !props.active && "10px"};
  filter: invert(100%) sepia(11%) saturate(2%) hue-rotate(72deg) brightness(106%) contrast(101%);
  border-radius: 4px;

  @media (max-width: ${VERY_SMALL_SIZE}) {
    height: 28px;
    width: 28px;
    margin-left: 20px;
  }
`

export const CloseSearchBarButton = styled.img`
  display: inline-flex;
  align-self: center;
  width: 28px;
  height: 28px;
  filter: invert(100%) sepia(11%) saturate(2%) hue-rotate(72deg) brightness(106%) contrast(101%);
`

export default TaskSearchInput;