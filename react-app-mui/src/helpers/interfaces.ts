export interface ITask {
    id: number
    title: string
    description: string
    important: boolean
    date: string
    taskType: string
}

export type IOptions = "A-Z" | "Z-A" | "Najwcześniejsza Data" | "Najpóźniejsza Data";

export interface IFilterStateEvent {
    filterOption: IOptions
    show: boolean
}