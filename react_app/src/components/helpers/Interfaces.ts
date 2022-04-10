export interface ITask {
    id?: number
    title: string
    description: string
    important: boolean
    notificationDate: number | string
    taskType: string
}