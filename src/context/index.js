import React, { createContext, useContext, useReducer } from 'react'
import { createBrowserHistory } from "history"
import { loadingReducer, initLoadingState } from '../reducers/loadingReducer'
import { toastReducer, initToastState } from '../reducers/toastReducer'
import { modalReducer, initModalState } from '../reducers/modalReducer'
import { authReducer, initAuthState } from '../reducers/authReducer'

const history = createBrowserHistory({
    forceRefresh: true
})

export const AppContext = createContext()

export const AppProvider = ({ children }) => (
    <AppContext.Provider
        value={{
            useAuth: useReducer(authReducer, initAuthState),
            useLoading: useReducer(loadingReducer, initLoadingState),
            useToast: useReducer(toastReducer, initToastState),
            useModal: useReducer(modalReducer, initModalState),
            history
        }}
    >
        {children}
    </AppContext.Provider>
)

export const useAppHooks = () => useContext(AppContext)