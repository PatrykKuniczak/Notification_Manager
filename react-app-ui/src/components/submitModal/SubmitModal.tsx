import SubmitModalContainer, { SubmitModalContent } from "./SubmitModalContainer";
import {useRef} from "react";
import {useOnClickOutside} from "usehooks-ts";


const SubmitModal = ({submitMessage, navAhead}: { submitMessage: string, navAhead: () => void }) => {
    const ref = useRef(null);

    useOnClickOutside(ref, navAhead);

    return (<SubmitModalContainer>
        <SubmitModalContent ref={ref}>
            <h3>{submitMessage}</h3>

            <button onClick={navAhead}>Potwierdź</button>
        </SubmitModalContent>
    </SubmitModalContainer>)
}


export default SubmitModal;