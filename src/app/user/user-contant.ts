import { User } from "../core/models/user.model"

export const AppUserConstant = {
    USER_GET:"USER_GET",
    USER_CREATE:"USER_CREATE",
    USER_DELETE:"USER_DELETE",
    USER_UPDATE:"USER_UPDATE",

    USER_GET_SUCCESS:"USER_GET_SUCCESS",
    USER_CREATE_SUCCESS:"USER_CREATE_SUCCESS",
    USER_DELETE_SUCCESS:"USER_DELETE_SUCCESS",
    USER_UPDATE_SUCCESS:"USER_UPDATE_SUCCESS",

    USER_GET_ERROR:"USER_GET_ERROR",
    USER_CREATE_ERROR:"USER_CREATE_ERROR",
    USER_DELETE_ERROR:"USER_DELETE_ERROR",
    USER_UPDATE_ERROR:"USER_UPDATE_ERROR",

    USER_GET_COMPLETE:"USER_GET_COMPLETE",
    USER_CREATE_COMPLETE:"USER_CREATE_COMPLETE",
    USER_DELETE_COMPLETE:"USER_DELETE_COMPLETE",
    USER_UPDATE_COMPLETE:"USER_UPDATE_COMPLETE",

    USER_GET_LIST:"USER_GET_LIST",
    USER_GET_LIST_SUCCESS:"USER_GET_LIST_SUCCESS",
    USER_GET_LIST_ERROR:"USER_GET_LIST_ERROR",
    USER_GET_LIST_COMPLETE:"USER_GET_LIST_COMPLETE"
}

export const DEFAULT_USER : User = {
    id: 0,
    name: "",
    surname: "",
    email: ""
}