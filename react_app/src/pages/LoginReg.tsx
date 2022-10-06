import RegLoginContainer, {
    LogRegH1, RegLoginContent,
    RegLoginHeader,
    RegLoginInputContainer,
    RegLogInput, RegLogLabel, SubmitMessage
} from "../components/regLogin/RegLoginModalContainer";
import RegLoginFunc from "../components/regLogin/RegLoginFunc";
import {Button} from "../components/faskForm/TaskFormContainer";


export type ILoginRegOption = "login" | "register"

const LoginReg = () => {
    const {
        loginRegOption,
        changeLoginRegOption,
        submitHandler,
        handleSubmit,
        register,
        errors,
        checkValidity,
        isSubmitting,
        responseMessage
    } = RegLoginFunc();

    return (<RegLoginContainer>
        <RegLoginContent>
            <RegLoginHeader>
                <LogRegH1 loginRegOption={loginRegOption}
                          onClick={() => changeLoginRegOption(`login`)}>Logowanie</LogRegH1>
                <LogRegH1 loginRegOption={loginRegOption}
                          onClick={() => changeLoginRegOption(`register`)}>Rejestracja</LogRegH1>
            </RegLoginHeader>

            <RegLoginInputContainer loginRegOption={loginRegOption} onSubmit={handleSubmit(data => submitHandler(data, loginRegOption))}>
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
                <SubmitMessage>{responseMessage}</SubmitMessage>
                <Button disabled={isSubmitting}>{loginRegOption === "login" ? "Zaloguj" : "Rejestruj"}</Button>
            </RegLoginInputContainer>
        </RegLoginContent>
    </RegLoginContainer>)
}


export default LoginReg;