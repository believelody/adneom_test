import React from 'react'
import { Pane } from 'evergreen-ui'
import LandingHeader from '../components/headers/LandingHeader'
import RegistrationForm from '../components/forms/RegistrationForm'

const LandingPage = () => {
    return (
        <Pane>
            <LandingHeader />
            <RegistrationForm />
        </Pane>
    )
}

export default LandingPage
