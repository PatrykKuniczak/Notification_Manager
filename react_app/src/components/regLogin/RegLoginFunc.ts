import {useEffect, useMemo, useState} from "react";
import {ILoginRegOption} from "../../pages/RegLogin";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import {boolean} from "yup";
import Axios from "axios";
import browserStore from "store";


type IInputType = "login" | "password" | "email";

const RegLoginFunc = () => {
    const [loginRegOption, setLoginRegOption] = useState<ILoginRegOption>("login");
    const [message, setMessage] = useState<string>("");

    const formikSchema = yup.object().shape({
        login: yup.string().required("Login jest wymagany").min(5, "Login jest za krótki").max(255, "Login jest za długi"),
        password: yup.string().required("Hasło jest wymagane").min(10, "Hasło jest za krótkie"),
        isLogin: boolean().required(),
        email: yup.string().when("isLogin", {
            is: false,
            then: schema => schema.required("Email jest wymagany").matches(/\S+@\S+\.\S{2,}/, "Nieprawidłowy email"),
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
        formState: {errors, touchedFields, isSubmitting},
        setError,
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

        const checkLogin = await Axios.get("/users", {params: {"field": "login", "data": object.login}})
            .catch(({message}) => {
                setMessage(message)
            });

        if (option === 'register') {
            const checkEmail = await Axios.get("/users", {
                params: {
                    "field": "email",
                    "data": object.email
                }
            }).catch(({message}) => {
                setMessage(message)
            });

            if (checkEmail?.data.length)
                setError("email", {type: 'custom', message: "Email jest już używany!"});

            else if (checkLogin?.data.length)
                setError("login", {type: 'custom', message: "Login jest już używany!"});

            else
                Axios.post("/users", object).then(() => {
                    setMessage("Utworzono");
                    reset(initialValue);
                }).catch(({response}) => setMessage(response.statusText))
        } else {
            const checkPassword = await Axios.get("/users", {params: {"field": "password", "data": object.password}});

            if (checkLogin?.data.length === 0 || checkPassword.data.length === 0) {
                setMessage("Hasło lub/i Login są błędne!");
            } else {
                browserStore.set("isLogged", true);
                // eslint-disable-next-line no-restricted-globals
                location.reload();
            }
        }
    }

    useEffect(() => {
        reset(initialValue);
        clearErrors();
        setMessage("");
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
        message
    }
}


export default RegLoginFunc;