import React from 'react'
import { Pane } from 'evergreen-ui'
import CreateAccountForm from '../components/forms/CreateAccountForm'

const CreateAccountPage = () => {
  return (
    <Pane height='100%' display='flex' justifyContent='center'>
      <CreateAccountForm />
    </Pane>
  )
}

export default CreateAccountPage
