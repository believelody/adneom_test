import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAppHooks } from '../../context'
import { getUser } from '../../utils/user.util'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { useAuth } = useAppHooks()
    const [{isConnected, user}, dispatchAuth] = useAuth

    console.log(user)

    return (
        <Route
            {...rest}
            render={
                props => isConnected && getUser() ?
                <Component {...props} /> :
                <Redirect to='/' />
            }
        />
    )
}

export default PrivateRoute
