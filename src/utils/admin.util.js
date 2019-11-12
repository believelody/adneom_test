export const ADNEOM_ADMIN = 'adneom_admin'
export const getAdmin = () => JSON.parse(localStorage.getItem(ADNEOM_ADMIN))
export const setAdmin = admin => localStorage.setItem(ADNEOM_ADMIN, JSON.stringify(admin))
export const deleteAdmin = () => localStorage.removeItem(ADNEOM_ADMIN)
