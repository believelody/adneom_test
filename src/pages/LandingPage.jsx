import React, { useEffect } from 'react'
import { Pane } from 'evergreen-ui'
import RegistrationForm from '../components/forms/RegistrationForm'
import { useAppHooks } from '../context'
import { BACK_HOME } from '../reducers/pageReducer'
import { deleteUser } from '../utils/user.util'
import { getCandidats } from '../utils/candidat.util'

const LandingPage = () => {
  const { usePage, useCandidat } = useAppHooks()
  const [pageState, dispatchPage] = usePage
  const [{candidats}, dispatchCandidat] = useCandidat

  useEffect(() => {
    deleteUser()
    dispatchPage({ type: BACK_HOME })
  }, [])

  console.log(candidats)

  return (
      <Pane>
        <RegistrationForm />
      </Pane>
  )
}

export default LandingPage
