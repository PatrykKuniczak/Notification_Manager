import Form, {
    Button,
    ButtonContainer,
    DateInput,
    Input,
    Label,
    Select,
    Slider,
    Switch,
    SwitchLabel,
    TaskFormContainer,
    Title
} from "../../components/faskForm/styles/TaskFormContainer";
import TaskFormFunc from "../../components/faskForm/logic/TaskFormFunc";


const TaskForm = ({type}: { type: "add" | "edit" | "display" }) => {
    const {
        navAhead,
        displayTypes,
        handleSubmit,
        errors,
        register,
        submitHandler,
        watch
    } = TaskFormFunc(type);


    return (<TaskFormContainer>
            <Title>
                <h1>
                    {type === "add" ? "Dodawanie Zadania " : type === "edit" ? "Edytowanie Zadania " : "Twoje Zadanie"}
                </h1>
            </Title>

            <Form onSubmit={handleSubmit(data => submitHandler(data))}>
                <Label htmlFor="title" error={errors.title?.message}>
                    Tytuł
                    <Input id="title" autoFocus disabled={type === "display"}
                           placeholder={"Podaj tytuł:"} {...register("title")}/>
                </Label>

                <Label htmlFor="description" error={errors.description?.message}>
                    Opis
                    <Input disabled={type === "display"} placeholder={"Podaj opis:"}
                           {...register("description")}/>
                </Label>

                <Label htmlFor="date" error={errors.date?.message}>
                    Data
                    <DateInput type="datetime-local" disabled={type === "display"}
                               {...register("date")}/>
                </Label>

                <Label htmlFor="taskType" error={errors.taskType?.message}>
                    Typ Aktywności
                    <Select disabled={type === "display"} {...register("taskType")}>
                        <option key="Default" value="Default">Wybierz opcję:</option>
                        {displayTypes()}
                    </Select>
                </Label>

                <SwitchLabel htmlFor="important" error={errors.important?.message!}>
                    Ważne
                    <Switch type={"checkbox"} {...register("important")}
                            disabled={type === "display"}/>
                    <Slider active={watch("important")} disabled={type === "display"}/>
                </SwitchLabel>

                <ButtonContainer>
                    {type === "display" && <Button type={"button"} onClick={navAhead}>
                        Przejdź do edycji
                    </Button>}

                    {type !== "display" && <Button type="submit">
                        {type === "add" ? "Dodaj" : "Potwierdź"}
                    </Button>
                    }
                </ButtonContainer>
            </Form>
        </TaskFormContainer>
    )
}


export default TaskForm;