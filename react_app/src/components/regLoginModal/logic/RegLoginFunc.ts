import {MutableRefObject, useEffect, useMemo, useState} from "react";
import {useOnClickOutside} from "usehooks-ts";
import {ILoginRegOption} from "../RegLoginModal";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import {usePrompt} from "../../../helpers/usePrompt";
import {boolean} from "yup";


interface IRegLoginFunc {
    ref: MutableRefObject<null | HTMLElement>
    changeModalVisibility: () => void
}

type IInputType = "login" | "password" | "email";

const RegLoginFunc = ({ref, changeModalVisibility}: IRegLoginFunc) => {
    const [loginRegOption, setLoginRegOption] = useState<ILoginRegOption>("login");

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

    const submitHandler = (data: { login: string, password: string, email: string }) => {
        changeModalVisibility();
        console.log(data);
    }

    const clickOutsideListener = () => {
        if (!isDirty)
            changeModalVisibility();
        else
            window.confirm("Rozpocząłeś wypełnianie danych, chcesz je stracić?") && changeModalVisibility();
    }

    usePrompt("Rozpocząłeś wypełnianie danych, chcesz je stracić?", isDirty);

    useOnClickOutside(ref, clickOutsideListener);

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
        isSubmitting
    }
}


export default RegLoginFunc;