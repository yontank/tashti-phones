export type Tphone = {
    id: number,
    lineNumber: string,
    lineType: string,
    OwnerId: number,
    isOccupied: Boolean,
    zakif: number,
    block: number,
    zug: number
}
export type TcreatePhone = {
    lineNumber: string,
    lineType: string,
    zakif: number,
    block: number,
    zug: number
}