import {useCallback, useEffect, useMemo, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {ITask} from "../../../helpers/interfaces";
import Axios from "axios";
import dateFormat from "dateformat";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";


const formikSchema = yup.object().shape({
    title: yup.string().required("Tytuł jest wymagany").min(5, "Tytuł jest za krótki").max(255, "Tytuł jest za długi"),
    description: yup.string().required("Opis jest wymagany").min(10, "Opis jest za krótki"),
    date: yup.date().required("Data jest nie prawidłowa").typeError("Data jest nieprawidłowa")
        .min(new Date(), "Data musi być późniejsza niż teraźniejsza")
        .max(new Date("2100-01-01 00:00"), "Data nie może być późniejsza niż 2100-01-01 00:00"),
    taskType: yup.string().test('is-not-default', "Wybierz opcję!",
        value => value !== "Default").required("Typ jest wymagany").min(3, "Typ jest za krótki"),
    important: yup.boolean().required("Wartość true lub false jest wymagana")
});

const TaskFormFunc = (type: "display" | "add" | "edit") => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");

    const initialValue = useMemo(() => ({
        date: "",
        description: "",
        id: 0,
        important: false,
        taskType: "Default",
        title: ""
    }), [])

    const {register, handleSubmit, formState: {errors, isDirty, touchedFields}, watch, reset} = useForm({
        defaultValues: initialValue,
        resolver: yupResolver(formikSchema),
        mode: "onTouched"
    });

    const getTaskItem = useCallback(async () => {
        if (type !== "add") {
            const {data} = await Axios.get(`/tasks/${id}`);

            const convertedData = {
                ...data,
                date: dateFormat(new Date(+data.date * 1000), "yyyy-mm-dd'T'HH:MM")
            }

            reset(convertedData);
        }
    }, [type, id, reset])


    const typesObject = {"Activity": "Aktywność fizyczna", "Sport": "Sport", "Cooking": "Gotowanie"};

    const navAhead = () => {
        const path = type === "add" || type === "edit" ? "/active" : `/edit-form/${id}`;
        navigate(path);
    }

    const displayTypes = () => Object.entries(typesObject).map(item =>
        <option key={item[0]} value={item[0]}>{item[1]}</option>);

    const submitHandler = async (data: ITask) => {
        if (isDirty) {
            const utcString = new Date(data.date).toUTCString();
            const timestamp = Date.parse(utcString);

            try {
                if (type === "add") {
                    await Axios.post("/tasks", {...data, date: timestamp});
                } else if (type === "edit") {
                    await Axios.put(`/tasks/${id}`, {...data, date: timestamp});
                }
            } catch (err: any) {
                setSubmitMessage(err.message);
            } finally {
                setSubmitMessage(`${type === "add" ? "Dodawanie" : "Edytowanie"} zadania powiodło się!`)
                setShowSubmitModal(true);
            }
        } else
            navAhead()
    }

    type IInputType = "title" | "description" | "taskType" | "date";

    const checkValidity = (field: IInputType) => {
        if (touchedFields[field]) {
            if (errors[field])
                return false;
            else if (!errors[field])
                return true;
        } else
            return null;
    }

    useEffect(() => {
        getTaskItem();
    }, [getTaskItem])

    useEffect(() => {
        type === "add" && reset(initialValue);
    }, [type, reset, initialValue])

    return {
        navAhead,
        displayTypes,
        submitHandler,
        register,
        handleSubmit,
        errors,
        watch,
        checkValidity,
        showSubmitModal,
        submitMessage
    }
}

export default TaskFormFunc;