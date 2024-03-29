import api from "./api";
import {setChapters} from "../views/app/play/playSlice";

export const GetItem = (itemId) => {
    return api.get(`/leetroll-app/item/get/${itemId}`)
        .then(resp => {
            return resp
        })
}

export const GetItemFiles = (itemId) => {
    return api.get(`/leetroll-admin/item/files/${itemId}`)
        .then(resp => {
            return resp
        })
}

export const GetChapters = (itemId) => dispatch => {
    return api.get(`/leetroll-app/item/chapter/${itemId}`)
        .then(resp => {
            dispatch(setChapters(resp))
            return resp
        })
}

export const listItem = () => {
    return api.get('/leetroll-admin/item/list')
        .then(resp => {
            return resp
        })
}

export const UpdateItem = (param) => {
    return api.post('/leetroll-admin/item/update', param)
        .then(resp => {
            return resp
        })
}

export const UploadItemFiles = (param) => {
    return api.post('/leetroll-admin/item/upload', param)
        .then(resp => {
            return resp
        })
}

export const UploadItemChapters = (param) => {
    return api.post('/leetroll-admin/chapter/upload', param)
        .then(resp => {
            return resp
        })
}