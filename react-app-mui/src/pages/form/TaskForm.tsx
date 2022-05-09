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
    const {
        active,
        taskItem,
        changeImportant,
        navAhead,
        confirmButtonType,
        displayTypes,
        buttonName,
        title
    } = TaskFormFunc(type);


    return (<TaskFormContainer>
            <Title>
                <h1>
                    {title()}
                </h1>
            </Title>

            <Form>
                <InputGroup>
                    <Label> Tytuł </Label>
                    <Input autoFocus value={taskItem.title} disabled={type === "display"}/>
                </InputGroup>

                <InputGroup>
                    <Label> Opis </Label>
                    <Input value={taskItem.description} disabled={type === "display"}/>
                </InputGroup>

                <InputGroup>
                    <Label> Data </Label>
                    <DateInput value={taskItem.date} type="datetime-local" disabled={type === "display"}/>
                </InputGroup>

                <InputGroup>
                    <Label> Typ Aktywności </Label>
                    <Select value={taskItem.taskType} disabled={type === "display"}>
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
                        {buttonName()}
                    </Button>
                </ButtonContainer>
            </Form>
        </TaskFormContainer>
    )
}


export default TaskForm;