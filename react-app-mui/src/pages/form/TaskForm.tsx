import Form, {
    Button,
    ButtonContainer,
    DateInput,
    Input,
    InputGroup,
    Label,
    Select,
    Slider,
    Switch,
    SwitchInputGroup,
    TaskFormContainer,
    Title
} from "../../components/faskForm/styles/TaskFormContainer";
import TaskFormFunc from "../../components/faskForm/logic/TaskFormFunc";


const TaskForm = ({type}: { type: "add" | "edit" | "display" }) => {
    const {active, item, changeImportant, navAhead, confirmButtonType, displayTypes} = TaskFormFunc(type);


    return (<TaskFormContainer>
            <Title>
                <h1>
                    {type === "add" ? "Dodawanie Zadania " : type === "edit" ? "Edytowanie Zadania " : "Twoje Zadanie"}
                </h1>
            </Title>

            <Form>
                <InputGroup>
                    <Label> Tytuł </Label>
                    <Input autoFocus value={type !== "add" ? item.title : ""} disabled={type === "display"}/>
                </InputGroup>

                <InputGroup>
                    <Label> Opis </Label>
                    <Input value={type !== "add" ? item.description: ""} disabled={type === "display"}/>
                </InputGroup>

                <InputGroup>
                    <Label> Data </Label>
                    <DateInput value={type !== "add" ? item.date: ""} type="datetime-local" disabled={type === "display"}/>
                </InputGroup>

                <InputGroup>
                    <Label> Typ Aktywności </Label>
                    <Select value={type !== "add" ? item.taskType : ""} disabled={type === "display"}>
                        {displayTypes()}
                    </Select>
                </InputGroup>

                <SwitchInputGroup>
                    <Label> Ważne </Label>
                    <Switch type={"radio"}/>
                    <Slider active={active} onClick={changeImportant} disabled={type === "display"}/>
                </SwitchInputGroup>

                <ButtonContainer>
                    <Button type={confirmButtonType()} onClick={navAhead}>
                        {type === "add" ? "Dodaj" : type === "edit" ? "Potwierdź" : "Przejdź do edycji"}
                    </Button>
                </ButtonContainer>
            </Form>
        </TaskFormContainer>
    )
}


export default TaskForm;