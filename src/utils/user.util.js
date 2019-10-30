export const ADNEOM_USER = 'adneom_user'
export const getUser = () => JSON.parse(localStorage.getItem(ADNEOM_USER))
export const setUser = user => localStorage.setItem(ADNEOM_USER, JSON.stringify(user))
export const deleteUser = () => localStorage.removeItem(ADNEOM_USER)
