import styled from "styled-components";
import starIcon from "../icons/star.svg";
import editIcon from "../icons/edit.svg";
import deleteIcon from "../icons/delete.svg";


const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  background-color: blue;
  gap: 20px;
  cursor: pointer;
  padding: 4px 15px;
  height: 50px;
`

const TextContainer = styled.div`
  display: inline-flex;
  align-items: center;
  width: 90%;
  gap: 10px;
  background-color: red;

  @media (max-width: 1300px) {
    width: 80%;
  }

  @media (max-width: 650px) {
    width: 70%;
  }

  @media (max-width: 450px) {
    width: 50%;
  }
`

const ButtonContainer = styled.div`
  display: inline-flex;
  justify-content: flex-end;
  width: 10%;
  gap: 15px;
  background-color: purple;

  @media (max-width: 1300px) {
    width: 20%;
  }

  @media (max-width: 650px) {
    width: 30%;
  }

  @media (max-width: 450px) {
    width: 50%;
  }
`

const IconElement = styled.input`
  width: 28px;

  @media (max-width: 800px) {
    width: 24px;
  }

  @media (max-width: 620px) {
    width: 26px;
  }


  @media (max-width: 350px) {
    width: 22px;
  }
`

const TextElement = styled.span`
  width: 40%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 28px;
  
  @media (max-width: 1400px) {
    font-size: 20px;
  }

  @media (max-width: 800px) {
    font-size: 18px;
  }
  
  @media (min-width: 900px) {
    width: 42.5%;
  }
  
  @media (max-width: 620px) {
    width: 60%;
    font-size: 24px;

    &:nth-child(2) {
      display: none;
    }
  }

  @media (max-width: 450px) {
    width: 100%;
  }
`

const DateElement = styled(TextElement)`
  width: 20%;
  display: inline-flex;
  justify-content: flex-end;
  padding-right: 15px;

  @media (min-width: 900px) {
    width: 15%;
  }
  
  @media (max-width: 620px) {
    width: 40%;
    font-size: 1.25em;
  }

  @media (max-width: 450px) {
    display: none;
  }
`


const Item = () => {
    return (<ListItem>
            <TextContainer>
                <TextElement>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</TextElement>
                <TextElement>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</TextElement>
                <DateElement>17.05.22</DateElement>
            </TextContainer>

            <ButtonContainer>
                <IconElement type="image" src={starIcon} alt="Przycisk Ważne"/>
                <IconElement type="image" src={editIcon} alt="Przycisk Edycji"/>
                <IconElement type="image" src={deleteIcon} alt="Przycisk Usuwania"/>
            </ButtonContainer>
        </ListItem>
    )
}


export default Item;