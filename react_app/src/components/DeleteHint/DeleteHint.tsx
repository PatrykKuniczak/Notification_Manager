import {Button, OverlayTrigger, Popover} from "react-bootstrap";
import styles from "../DeleteHint/DeleteHint.module.scss";
import deleteIcon from "../Items/icons/delete.svg";
import React, {useRef} from "react";


const DeleteHint = ({id, eventHandler}: { id: number, eventHandler: (id: number) => void }) => {
    const deleteRef = useRef(null);

    const handleClick = () => {
        document.getElementById("delete-btn")!.click()
    }

    return <OverlayTrigger
        trigger="click"
        key={id}
        placement={"left-end"}
        overlay={
            <Popover bsPrefix={styles["popover"]}>
                <Popover.Header bsPrefix={styles["popover-header"]}>Usuwanie Zadania</Popover.Header>
                <Popover.Body bsPrefix={styles["popover-body"]}>
                    <hr className={"m-0"}/>
                    <h6 className={"mt-3"}>Potwierdź, że chcesz usunąć zadanie</h6>

                    <div className={"d-flex justify-content-around mt-4"}>
                        <Button className="btn" variant="secondary" onClick={() => {
                            handleClick()
                        }}>Zamknij</Button>
                        <Button className="btn" variant="danger" onClick={async () => {
                            await eventHandler(id)
                        }
                        }>Usuń</Button>
                    </div>
                </Popover.Body>
            </Popover>

        }>
        <Button id="delete-btn" className={"p-0"} type="button" variant={"none"} ref={deleteRef}>
            <img src={deleteIcon} alt="Delete button"/>
        </Button>
    </OverlayTrigger>
}

export default DeleteHint;