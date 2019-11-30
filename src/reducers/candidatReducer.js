export const GET_ALL_CANDIDATS = 'GET_ALL_CANDIDATS'
export const ADD_CANDIDAT = 'ADD_CANDIDAT'
export const UPDATE_CANDIDAT = 'UPDATE_CANDIDAT'
export const DELETE_ONE_CANDIDAT = 'DELETE_ONE_CANDIDAT'
export const DELETE_ALL_CANDIDATS = 'DELETE_ALL_CANDIDATS'

export const initCandidatState = {
    candidats: []
}

export const candidatReducer = (state, { type, payload }) => {
    switch (type) {
        case GET_ALL_CANDIDATS:
            return {
                ...state,
                candidats: payload.candidats
            }

        case ADD_CANDIDAT:
            return {
                ...state,
                candidats: [payload.candidat, ...state.candidats]
            }

        case ADD_CANDIDAT:
            let candidat = state.candidats.find(c => c.id === payload.candidat.id)
            candidat = {...payload.candidat}

            return {
                ...state
            }

        case DELETE_ONE_CANDIDAT:
            return {
                ...state,
                candidats: state.candidats.filter(c => c.id !== payload.candidatId)
            }

        case DELETE_ALL_CANDIDATS:
            return {
                ...state,
                candidats: []
            }
    
        default:
            return state
    }
}