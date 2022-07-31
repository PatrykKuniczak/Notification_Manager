export interface ITask {
    id: number
    title: string
    description: string
    important: boolean
    date: string
}

export type IOptions = "A-Z" | "Z-A" | "Earlier Date" | "Latest Date" | "Important";

export interface IFilterStateEvent {
    filterOption: IOptions
    show: boolean
}