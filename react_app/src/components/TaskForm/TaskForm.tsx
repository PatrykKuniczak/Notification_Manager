import styles from "./TaskForm.module.scss";
import React, {useEffect, useMemo, useState} from "react";
import Form from "react-bootstrap/esm/Form";
import {Formik} from "formik";
import * as yup from "yup";
import {Button, Col, InputGroup, Modal, Row} from "react-bootstrap";
import Axios from "axios";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {CirclesWithBar} from "react-loader-spinner";
import dateFormat from "dateformat";
import {toTitle} from "../helpers/helpers";
import {ITask, TypeArray} from "../helpers/Interfaces";
import addIcon from "./icons/add.svg";
import closeIcon from "./icons/close.svg";


const formikSchema = yup.object().shape({
    title: yup.string().required("Tytuł jest wymagany").min(5, "Tytuł jest za krótki").max(255, "Tytuł jest za długi"),
    description: yup.string().required("Opis jest wymagany").min(10, "Opis jest za krótki"),
    eventStartDate: yup.date().default(() => new Date()),
    notificationDate: yup.date().required("Data jest wymagana").typeError("Data jest nieprawidłowa")
        .when(
            "eventStartDate",
            (eventStartDate, schema) => eventStartDate && schema.min(eventStartDate,
                `Date musi być późniejsza niż aktualna:
                 ${String(eventStartDate.toISOString().slice(0, 16)).replace("T", " ")}`)),
    important: yup.boolean().required("Wartość true lub false jest wymagana"),
    taskType: yup.string().test('is-not-default', "Wybierz opcję!",
        (value) => value !== "Default").required("Typ jest wymagany").min(3, "Typ jest za krótki"),
    taskTypeInput: yup.string().test('is-not-default', "Wybierz opcję!",
        (value) => value !== "Default").required("Typ jest wymagany").min(3, "Typ jest za krótki")
})

// TODO: ZRÓB USUWANIE I EDYCJE TYPÓW
// TODO: NIE DZIAŁA EDYCJA ZADANIA
const TaskForm: React.FC<{ actionType: string }> = ({actionType}) => {
    const initialState = useMemo(() => ({
        notificationDate: "",
        description: "",
        id: 0,
        important: false,
        taskType: "Default",
        taskTypeInput: "",
        title: ""
    }), [])


    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [showTaskInput, setShowTaskInput] = useState(false);
    const [showTaskInputModal, setShowTaskInputModal] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");
    const [taskSubmitMessage, setTaskSubmitMessage] = useState("");
    const [errorOccur, setErrorOccur] = useState(false);
    const [loading, setLoading] = useState(true);
    const [editData, setEditData] = useState<ITask>(initialState);
    const [typeArray, setTypeArray] = useState<TypeArray>([]);
    const [typeInputAction, setTypeInputAction] = useState("");


    const {id} = useParams();
    const navigate = useNavigate();

    const submitHandler = async (data: ITask) => {
        try {
            if (actionType === "add") {
                await Axios.post("/tasks", data);
            } else {
                await Axios.put(`/tasks/${id}`, data);
            }

            setSubmitMessage(`${actionType === "add" ? "Dodawanie" : "Edytowanie"} powiodło się.`);
            setShowSubmitModal(true);

        } catch (err: any) {
            setSubmitMessage(`${actionType === "add" ? "Dodawanie" : "Edytowanie"} nie powiodło się, wystąpił błąd: 
            ${err.message}`);
            setShowSubmitModal(true);
        }
    }

    useEffect(() => {
        Axios.get('/types').then(({data}) => {
            const convertedDate = data.map(({id, name}: { id: number, name: string }) => {
                return {id: id, name: toTitle(name)};
            })
            setTypeArray(convertedDate);
            setLoading(false);
        }).catch(() => setErrorOccur(true));
        if (actionType === "edit") {
            Axios.get(`/tasks/${id}`).then(({data}) => {
                const dateObj = new Date(data.notificationDate ? data.notificationDate : "");
                const convertedDate = dateFormat(dateObj, "yyyy-mm-dd'T'HH:MM");

                data["taskTypeInput"] = ""
                data["notificationDate"] = convertedDate;

                setEditData(data)
            }).catch(() => setErrorOccur(true));
        } else {
            setEditData(initialState)
        }
    }, [actionType, id, initialState, showTaskInputModal])

    const typeSubmitHandler = (taskType: string) => {
        return Axios.post('/types', {name: taskType}).then(() => {
            if (typeInputAction === "edit") {
                setTaskSubmitMessage(`Edytowanie powiodło się`)
            } else {
                setTaskSubmitMessage(`Dodawanie powiodło się`)
            }
        }).catch(() => {
            if (typeInputAction === "edit") {
                setTaskSubmitMessage(`Edytowanie nie powiodło się`)
            } else {
                setTaskSubmitMessage(`Dodawanie nie powiodło się`)
            }
        }).finally(() => {
            setShowTaskInputModal(true)
        })
    }

    const closeTypeInputModal = () => {
        setShowTaskInputModal(false);
        setShowTaskInput(false);
    }

    const contentSwitcher = () => {
        if (errorOccur) {
            return <h3 className={styles["error-message"]}>Wystąpił problem, podczas łączenia z serwerem.</h3>;
        } else if (loading) {
            return <div className={styles["loading-spinner"]}>
                <CirclesWithBar
                    color="#2d74e0"
                    outerCircleColor="#2678e1"
                    innerCircleColor="#4987f3"
                    barColor="#75716c"
                />
            </div>
        } else if (!loading) {
            return <Formik onSubmit={submitHandler} initialValues={editData}
                           validationSchema={formikSchema}
                           enableReinitialize={true}>
                {({
                      handleSubmit,
                      handleChange,
                      handleBlur,
                      values,
                      touched,
                      errors,
                  }) => (
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
                                    />
                                    <Form.Control.Feedback type="valid" tooltip> Zgodne </Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {errors.notificationDate}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>

                        <Row className="mb-5">
                            <Form.Group as={Col} md="max" controlId="taskTypeForm">
                                <Form.Label className={styles["form-label"]}>Typ Aktywności</Form.Label>
                                <InputGroup hasValidation className={styles["task-input"]}>
                                    <Form.Select
                                        name="taskType"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.taskType}
                                        isValid={touched.taskType && !errors.taskType}
                                        isInvalid={touched.taskType && !!errors.taskType}
                                    >
                                        <option value="Default" key="Default"> Wybierz opcję:</option>
                                        {typeArray.map(({id, name}) => <option value={name}
                                                                               key={id}> {name} </option>)}
                                    </Form.Select>

                                    <Form.Control.Feedback type="valid" tooltip> Zgodne </Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {errors.taskType}
                                    </Form.Control.Feedback>
                                    <Button type="button" onClick={() => setShowTaskInput(true)}><img src={addIcon}
                                                                                                      alt="Add Type button"/></Button>
                                </InputGroup>
                            </Form.Group>
                        </Row>

                        {showTaskInput && <Row className="mb-5 mt-5">
                            <Form.Group className={styles["task-type-input"]} as={Col} md="max"
                                        controlId="taskTypeInput">
                                <InputGroup hasValidation>
                                    <Form.Control
                                        type="text"
                                        name="taskTypeInput"
                                        value={toTitle(values.taskTypeInput)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.taskTypeInput && !errors.taskTypeInput}
                                        isInvalid={touched.taskTypeInput && !!errors.taskTypeInput}
                                        autoFocus
                                    />
                                    <Form.Control.Feedback type="valid" tooltip> Zgodne </Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {errors.taskTypeInput}
                                    </Form.Control.Feedback>
                                    <Button className={styles["close-btn"]} onClick={closeTypeInputModal}> <img
                                        src={closeIcon} alt="Close Type Input"/></Button>

                                    <Button className="ms-1"
                                            onClick={typeSubmitHandler.bind(this, values.taskTypeInput)}>
                                        {typeInputAction === "edit" ? "Edytuj" : "Dodaj"}
                                    </Button>
                                </InputGroup>
                            </Form.Group>

                            <Modal show={showTaskInputModal} onHide={closeTypeInputModal}>
                                <Modal.Body> {taskSubmitMessage} </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary"
                                            onClick={() => {
                                                closeTypeInputModal()
                                                values.taskTypeInput = ""
                                                touched.taskTypeInput = false;
                                            }}> Ok </Button>
                                </Modal.Footer>
                            </Modal>
                        </Row>}

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
                                    />
                                    <Form.Control.Feedback type="valid" tooltip> Zgodne </Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {errors.important}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>

                        <Modal show={showSubmitModal} onHide={() => navigate("/active")}>
                            <Modal.Body>{submitMessage}</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary">
                                    <NavLink to="/active"> Ok </NavLink>
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        <Button className="btn mt-5"
                                type="submit"> {actionType === "add" ? "Dodaj" : "Edytuj"} </Button>
                    </Form>
                )}
            </Formik>
        }
    }

    return <div className={styles["form-container"]}>
        <h1>{actionType === "add" ? "Dodawanie" : "Edytowanie"} Zadania</h1>
        {contentSwitcher()}
    </div>
}


export default TaskForm;