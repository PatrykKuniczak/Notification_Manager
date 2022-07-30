import styled from "styled-components";


const TaskSearchInput = styled.input`
  width: 250px;
  height: 40px;
  border-radius: 5px;
  background-color: #e0dede;
  padding-left: 10px;

  &::placeholder {
    color: #000000;
    font-weight: bold;
  }
`


export default TaskSearchInput;
