export declare type User = {
    id: number;
    name: string;
    surname: string;
    email: string;
}

export enum StorageEventType {
    Add = "Add",
    Update = "Update",
    Delete = "Delete"
}

export declare type UserLocalStorageDto = {
    user: User,
    eventType: StorageEventType
}