import {useRef} from "react";
import RegLoginModalContainer, {
    LogRegH1,
    RegLoginHeader,
    RegLoginInputContainer,
    RegLoginModalContent,
    RegLogInput, RegLogLabel
} from "./styles/RegLoginModalContainer";
import RegLoginFunc from "./logic/RegLoginFunc";
import {Button} from "../faskForm/styles/TaskFormContainer";


export type ILoginRegOption = "login" | "register"

const RegLoginModal = ({changeModalVisibility}: { changeModalVisibility: () => void }) => {
    const ref = useRef(null);

    const {
        loginRegOption,
        changeLoginRegOption,
        submitHandler,
        handleSubmit,
        register,
        errors,
        checkValidity,
        isSubmitting
    } = RegLoginFunc({ref, changeModalVisibility});

    return (<RegLoginModalContainer>
        <RegLoginModalContent ref={ref}>
            <RegLoginHeader>
                <LogRegH1 loginRegOption={loginRegOption}
                          onClick={() => changeLoginRegOption(`login`)}>Logowanie</LogRegH1>
                <LogRegH1 loginRegOption={loginRegOption}
                          onClick={() => changeLoginRegOption(`register`)}>Rejestracja</LogRegH1>
            </RegLoginHeader>

            <RegLoginInputContainer onSubmit={handleSubmit(data => submitHandler(data))}>
                <RegLogLabel htmlFor="login" error={errors.login?.message}>Login</RegLogLabel>
                <RegLogInput id="login" type="login" {...register("login")}
                             border={checkValidity("login")} autoFocus/>
                <RegLogLabel htmlFor="password" error={errors.password?.message}>Hasło</RegLogLabel>
                <RegLogInput id="password" type="password" {...register("password")}
                             border={checkValidity("password")}/>
                {loginRegOption === "register" && <>
                    <RegLogLabel htmlFor="email" error={errors.email?.message}>Email</RegLogLabel>
                    <RegLogInput id="email" type="email" {...register("email")}
                                 border={checkValidity("email")}/>
                </>}

                <Button disabled={isSubmitting}>{loginRegOption === "login" ? "Zaloguj" : "Rejestruj"}</Button>
            </RegLoginInputContainer>
        </RegLoginModalContent>
    </RegLoginModalContainer>)
}


export default RegLoginModal;