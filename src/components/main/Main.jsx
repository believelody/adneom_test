import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Pane } from 'evergreen-ui'
import LandingPage from '../../pages/LandingPage'
import QuizzPage from '../../pages/QuizzPage'
import UserPage from '../../pages/UserPage'
import PrivateRoute from '../private-route/PrivateRoute'
import ThanksPage from '../../pages/ThanksPage'
import AdminPage from '../../pages/AdminPage'
import CreateAccountPage from '../../pages/CreateAccountPage'
import LoginPage from '../../pages/LoginPage'
import AdminRoute from '../admin-route/AdminRoute'
import TestPage from '../../pages/TestPage'

const Main = () => {
    return (
        <Pane>
            <Switch>
                <AdminRoute exact path='/admin' component={AdminPage} />
                <PrivateRoute exact path='/users/:id' component={UserPage} />
                <PrivateRoute exact path='/users/:userId/quizz/:pageId' component={QuizzPage} />
                <PrivateRoute exact path='/thanks' component={ThanksPage} />
                <Route exact path='/:id/landing' component={LandingPage} />
                <Route exact path='/login' component={LoginPage} />
                <Route exact path='/create-account' component={CreateAccountPage} />
                <Route exact path='/test' component={TestPage} />
                <Redirect from='/' to='/login' />
            </Switch>
        </Pane>
    )
}

export default Main
