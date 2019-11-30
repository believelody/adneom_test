import React, { useEffect } from 'react'
import { Pane } from 'evergreen-ui'
import RegistrationForm from '../components/forms/RegistrationForm'
import { useAppHooks } from '../context'
import { BACK_HOME } from '../reducers/pageReducer'
import { deleteUser } from '../utils/user.util'
import { getCandidats } from '../utils/candidat.util'

const LandingPage = ({ match }) => {
  const { usePage, useCandidat } = useAppHooks()
  const [pageState, dispatchPage] = usePage
  const [{candidats}, dispatchCandidat] = useCandidat

  useEffect(() => {
    // deleteUser()
    dispatchPage({ type: BACK_HOME })
  }, [])

  return (
      <Pane>
        <RegistrationForm userId={match.params.id} />
      </Pane>
  )
}

export default LandingPage
