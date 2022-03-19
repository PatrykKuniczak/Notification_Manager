export interface ITask {
    id: number
    title: string
    description: string
    important: boolean
    notificationDate: string | undefined
    taskType: string
    taskTypeInput: string
}

export type TypeArray = { id: number, name: string }[]