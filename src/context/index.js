import React, { createContext, useContext, useReducer } from 'react'
import { createBrowserHistory } from "history"
import { loadingReducer, initLoadingState } from '../reducers/loadingReducer'
import { toastReducer, initToastState } from '../reducers/toastReducer'
import { modalReducer, initModalState } from '../reducers/modalReducer'
import { authReducer, initAuthState } from '../reducers/authReducer'
import { pageReducer, initPageState } from '../reducers/pageReducer'
import { quizzReducer, initQuizzState } from '../reducers/quizzReducer'
import { candidatReducer, initCandidatState } from '../reducers/candidatReducer'

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
            usePage: useReducer(pageReducer, initPageState),
            useQuizz: useReducer(quizzReducer, initQuizzState),
            useCandidat: useReducer(candidatReducer, initCandidatState),
            history
        }}
    >
        {children}
    </AppContext.Provider>
)

export const useAppHooks = () => useContext(AppContext)
