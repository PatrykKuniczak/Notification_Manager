import styles from "./TaskForm.module.scss";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Formik} from "formik";
import {Button, Col, InputGroup, Row, Form, Modal} from "react-bootstrap";
import Axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import dateFormat from "dateformat";
import {formikSchema, toTitle} from "../helpers/helpers";
import {ITask} from "../helpers/Interfaces";
import ErrorLoadingProvider from "../ErrorLoadingProvider/ErrorLoadingProvider";


type TypeArray = { id: number, name: string }[];

const TaskForm: React.FC<{ actionType: string }> = ({actionType}) => {
    const initialState = useMemo(() => ({
        notificationDate: "",
        description: "",
        important: false,
        taskType: "Default",
        title: ""
    }), [])


    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");
    const [errorOccur, setErrorOccur] = useState(false);
    const [loading, setLoading] = useState(true);
    const [editData, setEditData] = useState<ITask>(initialState);
    const [typeArray, setTypeArray] = useState<TypeArray>([]);

    const {id} = useParams();
    const navigate = useNavigate();

    const submitHandler = async (data: ITask) => {
        const utcString = new Date(data.notificationDate).toUTCString();
        const timestamp = Date.parse(utcString);

        try {
            if (actionType === "add") {
                await Axios.post("/tasks", {...data, notificationDate: timestamp});
            } else if (actionType === "edit") {
                await Axios.put(`/tasks/${id}`, {...data, notificationDate: timestamp});
            }
            setSubmitMessage(`${actionType === "add" ? "Dodawanie" : "Edytowanie"} powiodło się.`);

        } catch (err: any) {
            setSubmitMessage(`${actionType === "add" ? "Dodawanie" : "Edytowanie"} nie powiodło się,
             wystąpił błąd: ${err.message}`);
        } finally {
            setShowSubmitModal(true);
        }
    }

    const fetchTypes = useCallback(() => {
        Axios.get('/types').then(({data}) => {
            const convertedDate: TypeArray = data.map(({id, name}: { id: number, name: string }) => {
                return {id: id, name: toTitle(name)};
            })

            setTypeArray(convertedDate);
        }).catch(() => {
            setErrorOccur(true);
        });
    }, [])


    const fetchTask = useCallback(() => {
        if (actionType === "edit" || actionType === "display") {
            Axios.get(`/tasks/${id}`).then(({data}: { data: ITask }) => {
                setEditData({
                    ...data,
                    notificationDate: dateFormat(new Date(+data.notificationDate * 1000), "yyyy-mm-dd'T'HH:MM")
                })
            }).catch(() => setErrorOccur(true));
        } else {
            setEditData(initialState);
        }
    }, [actionType, id, initialState])


    useEffect(() => {
        actionType !== "display" && fetchTypes();
        fetchTask();
        setLoading(false);
    }, [fetchTypes, fetchTask, actionType])

    const Title = () => {
        if (actionType !== "display")
            return <h1>{actionType === "add" ? "Dodawanie" : actionType === "edit" && "Edytowanie"} Zadania</h1>;
        else
            return <h1> Twoje Zadanie </h1>
    }

    const SubmitButton = () => {
        if (actionType === "display") {
            return <>
                <Button type="button" onClick={() => navigate(`/active`)}> Powrót </Button>
                <Button type="button" onClick={() => navigate(`/edit-form/${id}`)}> Edytuj </Button>
            </>
        } else {
            return <Button className="btn mt-5" type="submit">
                {actionType === "add" ? "Dodaj" : actionType === "edit" && "Potwierdź"}
            </Button>
        }
    }

    return <div className={styles["form-container"]}>
        <Title/>
        <ErrorLoadingProvider loading={loading} errorOccur={errorOccur}>
            <Formik onSubmit={submitHandler}
                    initialValues={editData}
                    validationSchema={formikSchema}
                    enableReinitialize={true}>
                {({
                      handleSubmit,
                      handleChange,
                      handleBlur,
                      values,
                      touched,
                      errors
                  }) =>
                    (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Row className="mb-5 mt-5">
                                <Form.Group as={Col} md="max" controlId="titleForm">
                                    <Form.Label className={styles["form-label"]}>Tytuł</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            type="text"
                                            name="title"
                                            value={toTitle(values.title)}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.title && !errors.title}
                                            isInvalid={touched.title && !!errors.title}
                                            disabled={actionType === "display"}
                                            autoFocus
                                        />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            {errors.title}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Row>

                            <Row className="mb-5">
                                <Form.Group as={Col} md="max" controlId="descriptionForm">
                                    <Form.Label className={styles["form-label"]}>Opis</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            type="text"
                                            name="description"
                                            value={values.description}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.description && !errors.description}
                                            isInvalid={touched.description && !!errors.description}
                                            disabled={actionType === "display"}
                                        />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            {errors.description}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Row>

                            <Row className="mb-5">
                                <Form.Group as={Col} md="max" controlId="dateForm">
                                    <Form.Label className={styles["form-label"]}>Data</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            type="datetime-local"
                                            name="notificationDate"
                                            defaultValue={values.notificationDate}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.notificationDate && !errors.notificationDate}
                                            isInvalid={touched.notificationDate && !!errors.notificationDate}
                                            disabled={actionType === "display"}
                                        />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            {errors.notificationDate}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Row>

                            <Row className="mb-5">
                                <Form.Group as={Col} md="max" controlId="taskTypeForm">
                                    <Form.Label className={styles["form-label"]}>Typ Aktywności</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Select
                                            name="taskType"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.taskType}
                                            isValid={touched.taskType && !errors.taskType}
                                            isInvalid={touched.taskType && !!errors.taskType}
                                            disabled={actionType === "display"}
                                        >
                                            <option value="Default" key="Default"> Wybierz opcję:</option>
                                            {typeArray.map(({id, name}) => <option value={name}
                                                                                   key={id}> {name} </option>)}
                                        </Form.Select>

                                        <Form.Control.Feedback type="invalid" tooltip>
                                            {errors.taskType}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Row>

                            <Row className="mb-2">
                                <Form.Group as={Col} md="max" controlId="importantForm">
                                    <Form.Label className={styles["form-label"]}> Ważne </Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Check
                                            className={"mt-2"}
                                            type="switch"
                                            id="custom-switch"
                                            name="important"
                                            checked={values.important}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.important && !errors.important}
                                            isInvalid={touched.important && !!errors.important}
                                            disabled={actionType === "display"}
                                        />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            {errors.important}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Row>

                            <Modal show={showSubmitModal} onHide={() => {
                                navigate("/active")
                            }}>
                                <Modal.Body>{submitMessage}</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" type="button" onClick={() => {
                                        setShowSubmitModal(false)
                                        navigate("/active")
                                    }}> Ok </Button>
                                </Modal.Footer>
                            </Modal>

                            <div
                                className={`d-flex justify-content-${actionType === "display" ? "between mt-5" : "end mt-3"}`}>
                                <SubmitButton/>
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </ErrorLoadingProvider>
    </div>
}


export default TaskForm;