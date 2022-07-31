import starIcon from "../icons/star.svg";
import editIcon from "../icons/edit.svg";
import deleteIcon from "../icons/delete.svg";
import {TextContainer, TextElement, DateElement} from "./styles/Item/TextContainer";
import {ButtonContainer, IconElement} from "./styles/Item/ButtonContainer";
import {ListContainer} from "./styles/Item/ListContainer";
import ItemFunc from "./logic/ItemFunc";
import {ITask} from "../../helpers/interfaces";
import DeletePopUp from "../deletePopUp/DeletePopUp";


interface IItemProps {
    item: ITask
    active: boolean
}

const Item = ({item, active}: IItemProps) => {
    const {
        changeImportant,
        displayFormNav,
        editFormNav,
        convertedDate,
        showDeletePopUp,
        showPopUp,
        removeTask,
        closeDeletePopUp
    } = ItemFunc(item);

    return (<ListContainer>
            <TextContainer onClick={displayFormNav}>
                <TextElement>{item.title}</TextElement>
                <TextElement>{item.description}</TextElement>
                <DateElement>{convertedDate()}</DateElement>
            </TextContainer>

            <ButtonContainer>
                <IconElement name="star" type="image" src={starIcon} activeImportant={item.important}
                             active={active}
                             onClick={changeImportant} alt="Przycisk Ważne"/>
                <IconElement name="edit" type="image" src={editIcon} onClick={editFormNav} alt="Przycisk Edycji"/>
                <IconElement name="delete" type="image" src={deleteIcon} onClick={showDeletePopUp}
                             alt="Przycisk Usuwania"/>
                {showPopUp && <DeletePopUp closePopUp={closeDeletePopUp} deleteTask={removeTask}/>}
            </ButtonContainer>
        </ListContainer>

    )
}

export default Item;