import React, { useEffect } from 'react'
import { Pane } from 'evergreen-ui'
import LandingHeader from '../components/headers/LandingHeader'
import RegistrationForm from '../components/forms/RegistrationForm'
import { useAppHooks } from '../context'
import { BACK_HOME } from '../reducers/pageReducer'
import { deleteUser } from '../utils/user.util'

const LandingPage = () => {
  const { usePage } = useAppHooks()
  const [pageState, dispatchPage] = usePage

  useEffect(() => {
    deleteUser()
    dispatchPage({ type: BACK_HOME })
  }, [])

  return (
      <Pane>
        <RegistrationForm />
      </Pane>
  )
}

export default LandingPage
