import styles from "./TaskForm.module.scss";
import React from "react";
import Form from "react-bootstrap/esm/Form";
import {Formik} from "formik";
import * as yup from "yup";
import {IInitialValues} from "../helpers/interfaces/Interfaces";
import {Button, Col, InputGroup, Row} from "react-bootstrap";


const formikSchema = yup.object().shape({
    title: yup.string().required("Tytuł jest wymagany").min(10, "Tytuł jest za krótki").max(255, "Tytuł jest za długi"),
    description: yup.string().required("Opis jest wymagany").min(50, "Opis jest za krótki"),
    eventStartDate: yup.date().default(() => new Date()),
    notificationDate: yup.date().required("Data jest wymagana")
        .when(
            "eventStartDate",
            (eventStartDate, schema) => eventStartDate && schema.min(eventStartDate,
                `Date musi być późniejsza niż aktualna:
                 ${String(eventStartDate.toISOString().slice(0, 16)).replace("T", " ")}`)),
    important: yup.boolean().required()
})

const initialValues: IInitialValues = {
    important: false,
    notificationDate: "",
    title: "",
    description: ""
}


// TODO: OSTYLUJ TO
const TaskForm: React.FC<{ actionType: string }> = ({actionType}) => {


    // TODO: WYŚLIJ NA BAZE
    const submitHandler = ({title, description, important, notificationDate}: IInitialValues) => {
    }


    return <div className={styles["form-container"]}>
        <h1>Dodawanie Zadania</h1>
        <Formik onSubmit={submitHandler}
                initialValues={initialValues} validationSchema={formikSchema}>
            {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  touched,
                  errors,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Row className="mb-5">
                        <Form.Group as={Col} md="max" controlId="titleForm">
                            <Form.Label>Tytuł</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={values.title}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.title && !errors.title}
                                    isInvalid={touched.title && !!errors.title}
                                    autoFocus
                                />
                                <Form.Control.Feedback type="valid" tooltip> Zgodne </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {errors.title}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Row>

                    <Row className="mb-5">
                        <Form.Group as={Col} md="max" controlId="descriptionForm">
                            <Form.Label>Opis</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="text"
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.description && !errors.description}
                                    isInvalid={touched.description && !!errors.description}
                                />
                                <Form.Control.Feedback type="valid" tooltip> Zgodne </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {errors.description}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Row>

                    <Row className="mb-5">
                        <Form.Group as={Col} md="max" controlId="dateForm">
                            <Form.Label>Data</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="datetime-local"
                                    name="notificationDate"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.notificationDate && !errors.notificationDate}
                                    isInvalid={touched.notificationDate && !!errors.notificationDate}
                                />
                                <Form.Control.Feedback type="valid" tooltip> Zgodne </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {errors.notificationDate}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Row>

                    <Row className="mb-2">
                        <Form.Group as={Col} md="max" controlId="importantForm">
                            <Form.Label>Ważne</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    name="important"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.important && !errors.important}
                                    isInvalid={touched.important && !!errors.important}
                                />
                                <Form.Control.Feedback type="valid" tooltip> Zgodne </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {errors.important}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Row>

                    <Button className="btn mt-5" type="submit"> Dodaj </Button>
                </Form>
            )}
        </Formik>
    </div>
}


export default TaskForm;