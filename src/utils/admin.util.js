export const ADNEOM_ADMIN = 'adneom_admin'
export const getAdmin = () => JSON.parse(localStorage.getItem(ADNEOM_ADMIN))
export const getIsAdmin = () => JSON.parse(localStorage.getItem('is_admin'))
export const setAdmin = admin => localStorage.setItem(ADNEOM_ADMIN, JSON.stringify(admin))
export const setIsAdmin = (isAdmin = true) => localStorage.setItem('is_admin', isAdmin)
export const deleteAdmin = () => localStorage.removeItem(ADNEOM_ADMIN)
