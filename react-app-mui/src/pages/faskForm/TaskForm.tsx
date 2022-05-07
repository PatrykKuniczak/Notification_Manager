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
} from "./styles/FormContainer";
import TaskFunc from "./logic/TaskFunc";


const TaskForm = ({type}: { type: "add" | "edit" | "display" }) => {
    const {active, changeImportant, navAhead, confirmButtonType, displayTypes} = TaskFunc(type);


    return (<TaskFormContainer>
            <Title>
                <h1>
                    {type === "add" ? "Dodawanie Zadania " : type === "edit" ? "Edytowanie Zadania " : "Twoje Zadanie"}
                </h1>
            </Title>

            <Form>
                <InputGroup>
                    <Label> Tytuł </Label>
                    <Input autoFocus disabled={type === "display"}/>
                </InputGroup>

                <InputGroup>
                    <Label> Opis </Label>
                    <Input disabled={type === "display"}/>
                </InputGroup>

                <InputGroup>
                    <Label> Data </Label>
                    <DateInput type="datetime-local" disabled={type === "display"}/>
                </InputGroup>

                <InputGroup>
                    <Label> Typ Aktywności </Label>
                    <Select disabled={type === "display"}>
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