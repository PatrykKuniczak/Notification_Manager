import {useEffect, useMemo, useState} from "react";
import {ILoginRegOption} from "../../pages/LoginReg";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import {usePrompt} from "../../helpers/usePrompt";
import {boolean} from "yup";
import Axios from "axios";


type IInputType = "login" | "password" | "email";

const RegLoginFunc = () => {
    const [loginRegOption, setLoginRegOption] = useState<ILoginRegOption>("login");
    const [responseMessage, setResponseMessage] = useState<string>("");

    // TODO: VALIDATOR Z CLASS-VALIDATOR NIE ZGADZA SIĘ Z TYM ODNOŚNIE EMAIL
    const formikSchema = yup.object().shape({
        login: yup.string().required("Login jest wymagany").min(5, "Login jest za krótki").max(255, "Login jest za długi"),
        password: yup.string().required("Hasło jest wymagane").min(10, "Hasło jest za krótkie"),
        isLogin: boolean().required(),
        email: yup.string().when("isLogin", {
            is: false,
            then: schema => schema.required("Email jest wymagany").email("Nieprawidłowy email"),
            otherwise: schema => schema.optional()
        })
    });

    const initialValue = useMemo(() => ({
        login: "",
        password: "",
        email: "",
        isLogin: loginRegOption === "login"
    }), [loginRegOption])

    const {
        register,
        handleSubmit,
        formState: {errors, isDirty, touchedFields, isSubmitting},
        clearErrors,
        reset
    } = useForm({
        defaultValues: initialValue,
        resolver: yupResolver(formikSchema),
        mode: "onTouched"
    });

    const checkValidity = (field: IInputType) => {
        if (touchedFields[field]) {
            if (errors[field])
                return false;
            else if (!errors[field])
                return true;
        } else
            return null;
    }

    const changeLoginRegOption = (option: ILoginRegOption) => {
        setLoginRegOption(option);
    }

    const submitHandler = async (object: typeof initialValue, option: 'login' | 'register') => {
        // @ts-ignore
        delete object.isLogin;
        setResponseMessage("")

        // TODO: NIE DZIAŁA PRAWIDŁOWO
        if (option === 'register') {
            const checkLogin = await Axios.get("/users", {params: {"field": "login", "data": object.login}});
            const checkEmail = await Axios.get("/users", {params: {"field": "email", "data": object.email}});

            if (checkEmail.data || checkLogin.data) {

                if (checkEmail.data) {
                    setResponseMessage("Email jest już używany!");
                } else if (checkLogin.data) {
                    setResponseMessage("Login jest już używany!");
                } else {
                    const res = await Axios.post("/users", object);
                    if (res.status === 201) {
                        setResponseMessage("Utworzono");
                        await reset(initialValue);
                    } else
                        setResponseMessage(res.data);
                }
            }
        } else
            await Axios.post("/users");
    }

    usePrompt("Rozpocząłeś wypełnianie danych, chcesz je stracić?", isDirty);

    useEffect(() => {
        reset(initialValue);
        clearErrors();
    }, [reset, initialValue, loginRegOption, clearErrors])

    return {
        loginRegOption,
        changeLoginRegOption,
        submitHandler,
        handleSubmit,
        register,
        errors,
        checkValidity,
        isSubmitting,
        responseMessage
    }
}


export default RegLoginFunc;