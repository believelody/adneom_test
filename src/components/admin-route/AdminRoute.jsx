import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAppHooks } from '../../context'
import { getIsAdmin } from '../../utils/admin.util'
import { SUCCESS_ADMIN } from '../../reducers/authReducer'

const AdminRoute = ({ component: Component, ...rest }) => {
    const { useAuth } = useAppHooks()
    const [{isAdmin}, dispatchAuth] = useAuth

    useEffect(() => {
        if (!isAdmin && getIsAdmin()) {
            console.log(true)
            dispatchAuth({ type: SUCCESS_ADMIN })
        }
    }, [])

    return (
        <Route
            {...rest}
            render={
                props => getIsAdmin() || isAdmin ?
                    <Component {...props} /> :
                    <Redirect to='/login' />
            }
        />
    )
}

export default AdminRoute
