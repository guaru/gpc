export interface IOfficeForm{
    id:string,
    name:string|undefined,
    key:string|undefined,
    address:string|undefined,
    state:string|undefined,
    areas:string[]|undefined,
    daysOperation: string[] | undefined,
    initTimeAttention:string | undefined,
    endTimeAttention:string | undefined,
    enabled: boolean|false
}
