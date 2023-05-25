export declare type ApiResponse<T> = {
    headers: any,
    data: T,
    messages: string[],
    exception: any,
    exceptionCode: string,
    exceptionMessage:string,
    statusCode: number
}
export enum ResultStateEnum {
    Completed="Completed",
    NotCompleted="NotCompleted"
}
export declare type ResponseList<T>={
    data:T[],
    offset:number,
    size:number,
    totalCount:number
}