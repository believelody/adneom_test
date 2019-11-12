import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAppHooks } from '../../context'
import { getAdmin } from '../../utils/admin.util'
import { SUCCESS_AUTH } from '../../reducers/authReducer'

const AdminRoute = ({ component: Component, ...rest }) => {
    const { useAuth } = useAppHooks()
    const [{user}, dispatchAuth] = useAuth

    useEffect(() => {
        if (getAdmin()) {
            dispatchAuth({ type: SUCCESS_AUTH, payload: {user: getAdmin()} })
        }
    }, [])

    return (
        <Route
            {...rest}
            render={
                props => getAdmin() ?
                    <Component {...props} /> :
                    <Redirect to='/login' />
            }
        />
    )
}

export default AdminRoute
