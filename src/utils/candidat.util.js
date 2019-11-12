export const ADNEOM_CANDIDATS = 'adneom_candidats'
export const getCandidats = () => JSON.parse(localStorage.getItem(ADNEOM_CANDIDATS))
export const setCandidats = candidats => localStorage.setItem(ADNEOM_CANDIDATS, JSON.stringify(candidats))
export const deleteCandidats = () => localStorage.removeItem(ADNEOM_CANDIDATS)
