export const ANSWER_FOUND = 'ANSWER_FOUND'
export const QUIZZ_FINISHED = 'QUIZZ_FINISHED'
export const INITIATE_QUIZZ = 'INITIATE_QUIZZ'
export const QUIZZ_TIME = 'QUIZZ_TIME'

export const initQuizzState = {
    score: 0,
    min: 0,
    sec: 0,
    isEnded: false
}

export const quizzReducer = (state, {type, payload}) => {
    switch (type) {
        case ANSWER_FOUND:
            return {
                ...state,
                score: state.score + 1,
            }

        case QUIZZ_FINISHED:
            return {
                ...state,
                isEnded: true
            }

        case QUIZZ_TIME:
            return {
                ...state,
                min: payload.min,
                sec: payload.sec
            }

        case INITIATE_QUIZZ:
            return initQuizzState
    
        default:
            return state
    }
}