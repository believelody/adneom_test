export const SUCCESS_AUTH = 'SUCCESS_AUTH'
export const SUCCESS_ADMIN = 'SUCCESS_ADMIN'
export const ERROR_AUTH = 'ERROR_AUTH'
export const RESET_ERROR = 'RESET_ERROR'
export const GET_ALL_ADMINS = 'GET_ALL_ADMINS'
export const GET_ONE_ADMIN = 'GET_ONE_ADMIN'
export const ADD_ADMIN = 'ADD_ADMIN'
export const SET_ADMIN = 'SET_ADMIN'
export const REMOVE_ADMIN = 'REMOVE_ADMIN'
export const REMOVE_ALL_ADMINS = 'REMOVE_ALL_ADMINS'
export const LOG_OUT = 'LOG_OUT'

export const initAuthState = {
    admins: [],
    isConnected: false,
    isAdmin: false,
    errors: null
}

export const authReducer = (state, { type, payload }) => {
    switch (type) {
        case SUCCESS_AUTH:
            return {
                ...state,
                isConnected: true
            }
        
        case SUCCESS_ADMIN:
            return {
                ...state,
                isAdmin: true
            }

        case ERROR_AUTH:
            let key, value
            Object.entries(payload).forEach(([k, v]) => {
                key = k
                value = v
            })
            return {
                ...state,
                errors: { ...state.errors, [key]: value }
            }

        case RESET_ERROR:
            return {
                ...state,
                errors: null
            }

        case GET_ALL_ADMINS:
            return {
                ...state,
                admins: payload.admins
            }

        case ADD_ADMIN:
            return {
                ...state,
                admins: [...state.admins, payload.admin]
            }

        case SET_ADMIN:
            return {
                ...state,
                admins: payload.admins
            }

        case REMOVE_ADMIN:
            return {
                ...state,
                admins: state.admins.filter(admin => admin.email !== payload.adminEmail)
            }

        case LOG_OUT:
            return initAuthState

        default:
            return state
    }
}