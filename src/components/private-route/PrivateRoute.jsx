import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAppHooks } from '../../context'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { useAuth } = useAppHooks()
    const [{isConnected}, dispatchAuth] = useAuth

    return (
        <Route
            {...rest}
            render={
                props => isConnected?
                <Component {...props} /> :
                <Redirect to='/' />
            }
        />
    )
}

export default PrivateRoute
