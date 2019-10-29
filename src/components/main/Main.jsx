import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Pane } from 'evergreen-ui'
import LandingPage from '../../pages/LandingPage'
import QuizzPage from '../../pages/QuizzPage'

const Main = () => {
    return (
        <Pane>
            <Switch>
                <Route exact path='/' component={LandingPage} />
                <Route exact path='/quizz/:id' component={QuizzPage} />
            </Switch>
        </Pane>
    )
}

export default Main
