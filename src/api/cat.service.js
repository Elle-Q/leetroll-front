import api from "./api";

export const ListCat = () => {
    return api.get('/homo-admin/cat/list')
        .then(resp => {
            return resp
        })
}

export const UpdateCat = (param) => {
    return api.post('/homo-admin/cat/update', param)
        .then(resp => {
            return resp
        })
}

export const ListCatName = () => {
    return api.get('/homo-admin/cat/list-name')
        .then(resp => {
            return resp
        })
}