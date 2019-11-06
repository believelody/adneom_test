import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Pane } from 'evergreen-ui'
import LandingPage from '../../pages/LandingPage'
import QuizzPage from '../../pages/QuizzPage'
import UserPage from '../../pages/UserPage'
import PrivateRoute from '../private-route/PrivateRoute'

const Main = () => {
    return (
        <Pane>
            <Switch>
                <Route exact path='/' component={LandingPage} />
                <PrivateRoute exact path='/users/:id' component={UserPage} />
                <PrivateRoute exact path='/users/:userId/quizz/:pageId' component={QuizzPage} />
            </Switch>
        </Pane>
    )
}

export default Main
