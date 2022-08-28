import {useRef, useState} from "react";
import {useOnClickOutside} from "usehooks-ts";
import RegLoginModalContainer, {
    Login,
    LoginRegisterButton,
    Register,
    RegLoginHeader,
    RegLoginInputContainer,
    RegLoginModalContent
} from "./RegLoginModalContainer";


export type ILoginRegOption = "login" | "register"

const RegLoginModal = ({changeModalVisibility}: { changeModalVisibility: () => void }) => {
    const ref = useRef(null);
    const [loginRegOption, setLoginRegOption] = useState<ILoginRegOption>("login");

    useOnClickOutside(ref, () => changeModalVisibility());

    const changeLoginRegOption = (option: ILoginRegOption) => {
        setLoginRegOption(option);
    }

    return (<RegLoginModalContainer>
        <RegLoginModalContent ref={ref}>
            <RegLoginHeader>
                <Login loginRegOption={loginRegOption}
                       onClick={() => changeLoginRegOption(`login`)}>Logowanie</Login>
                <Register loginRegOption={loginRegOption}
                          onClick={() => changeLoginRegOption(`register`)}>Rejestracja</Register>
            </RegLoginHeader>

            <RegLoginInputContainer>
                <label htmlFor="login">Login</label>
                <input id="login" type="login"/>
                <label htmlFor="password">Hasło</label>
                <input id="password" type="password"/>
                {loginRegOption === "register" && <>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email"/>
                </>}

                <LoginRegisterButton
                    type="submit">{loginRegOption === "login" ? "Zaloguj" : "Rejestruj"}</LoginRegisterButton>
            </RegLoginInputContainer>
        </RegLoginModalContent>
    </RegLoginModalContainer>)
}


export default RegLoginModal;