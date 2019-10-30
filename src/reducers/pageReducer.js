export const PAGE_LOADED = 'PAGE_LOADED'
export const BACK_HOME = 'BACK_HOME'

export const initPageState = {
  pageLoaded: '/'
}

export const pageReducer = (state, {type, payload}) => {
  switch (type) {
    case PAGE_LOADED:
      return {
        ...state,
        pageLoaded: payload.pageLoaded
      }

    case BACK_HOME:
      return initPageState

    default:
      return state
  }
}
