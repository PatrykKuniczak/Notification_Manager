import * as yup from "yup";


export const toTitle = (str: string) => {
    return str.toLowerCase().replace(/(^|\s)\S/g, function (char) {
        return char.toUpperCase();
    })
};

export const formikSchema = yup.object().shape({
    title: yup.string().required("Tytuł jest wymagany").min(5, "Tytuł jest za krótki").max(255, "Tytuł jest za długi"),
    description: yup.string().required("Opis jest wymagany").min(10, "Opis jest za krótki"),
    eventStartDate: yup.date().default(() => new Date()),
    notificationDate: yup.date().required("Data jest wymagana").typeError("Data jest nieprawidłowa")
        .when(
            "eventStartDate",
            (eventStartDate, schema) => eventStartDate && schema.min(eventStartDate,
                `Date musi być późniejsza niż aktualna:
                 ${String(eventStartDate.toISOString().slice(0, 16)).replace("T", " ")}`)),
    taskType: yup.string().test('is-not-default', "Wybierz opcję!",
        (value) => value !== "Default").required("Typ jest wymagany").min(3, "Typ jest za krótki"),
    important: yup.boolean().required("Wartość true lub false jest wymagana")
});