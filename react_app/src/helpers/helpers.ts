import * as yup from "yup";


export const toTitle = (str: string) => {
    return str.toLowerCase().replace(/(^|\s)\S/g, function (char) {
        return char.toUpperCase();
    })
};
export const formikSchema = yup.object().shape({
    title: yup.string().required("Tytuł jest wymagany").min(5, "Tytuł jest za krótki").max(255, "Tytuł jest za długi"),
    description: yup.string().required("Opis jest wymagany").min(10, "Opis jest za krótki"),
    notificationDate: yup.date().required("Data jest nie prawidłowa").typeError("Data jest nieprawidłowa")
        .min(new Date(), "Data musi być późniejsza niż teraźniejsza")
        .max(new Date("2100-01-01 00:00"), "Data nie może być późniejsza niż 2100-01-01 00:00"),
    taskType: yup.string().test('is-not-default', "Wybierz opcję!",
        value => value !== "Default").required("Typ jest wymagany").min(3, "Typ jest za krótki"),
    important: yup.boolean().required("Wartość true lub false jest wymagana")
});