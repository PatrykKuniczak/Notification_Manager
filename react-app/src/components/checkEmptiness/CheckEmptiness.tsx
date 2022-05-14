import {NavLink, useLocation} from "react-router-dom";
import CheckEmptinessContainer, {NavButton} from "./CheckEmptinessContainer";


const CheckEmptiness = () => {
    const checkLocation = useLocation().pathname === "/active";

    return <CheckEmptinessContainer>
        <h3>Nie ma tutaj żadnego zadania{checkLocation && ", dodaj je:"}</h3>

        <NavLink to={checkLocation ? "/add-form" : "/active"}>
            <NavButton>
                {checkLocation ? "Dodaj Zadanie" : "Przejdź do aktywnych"}
            </NavButton>
        </NavLink>
    </CheckEmptinessContainer>
}

export default CheckEmptiness;