export interface ITask {
    id?: number
    title: string
    description: string
    important: boolean
    notificationDate: string | undefined
    taskType: string
    taskTypeInput?: string | undefined
}

export type TypeArray = { id: number, name: string }[]