import DeletePopUpContainer, {Button, ButtonsContainer} from "./DeletePopUpContainer";
import {useOnClickOutside} from "usehooks-ts";
import {useRef} from "react";


const DeletePopUp = ({closePopUp, deleteTask}: { closePopUp: () => void, deleteTask: () => void }) => {
    const ref = useRef(null);

    useOnClickOutside(ref, closePopUp);

    return <DeletePopUpContainer ref={ref}>
        <h3> Czy na pewno chcesz usunąć zadanie?</h3>

        <ButtonsContainer>
            <Button buttonType="close" onClick={closePopUp}> Zamknij </Button>
            <Button buttonType="delete" onClick={deleteTask}> Usuń </Button>
        </ButtonsContainer>
    </DeletePopUpContainer>
}


export default DeletePopUp;