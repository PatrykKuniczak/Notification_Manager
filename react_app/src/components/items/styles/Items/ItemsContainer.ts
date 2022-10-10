import styled from "styled-components";
import {M_SIZE, S_SIZE} from "../../../../helpers/constants";


export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: ${S_SIZE}) {
    height: calc(100vh - 74px);
    border-radius: 35px;
  }
}
`

export const ItemsList = styled.ul`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 131px);
  min-height: calc(32px + 16px + 60px);
  max-height: calc(100vh - 83px - 80px);
  overflow-y: auto;
  gap: 20px;
  padding: 30px;
  margin: 20px;
  border-radius: 70px;
  background: linear-gradient(0deg, #9331e7, #974ae1);

  &::-webkit-scrollbar {
    display: none
  }

  @media (max-width: ${S_SIZE}) {
    min-width: calc(100vw - 40px);
    border-radius: 35px;
  }

  @media (max-width: ${M_SIZE}) {
    width: calc(100vw - 114px);
  }
`