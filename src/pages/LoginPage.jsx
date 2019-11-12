import React, { useEffect, useState } from 'react'
import {Redirect} from 'react-router-dom'
import { Pane } from 'evergreen-ui'
import LoginForm from '../components/forms/LoginForm'
import {useAppHooks} from '../context'
import {SET_LOADING, RESET_LOADING} from '../reducers/loadingReducer'

const LoginPage = () => {
  const {useAuth, useLoading} = useAppHooks()
  const [{isConnected}, dispatchAuth] = useAuth
  const [{loading}, dispatchLoading] = useLoading

  return (
    !isConnected ?
    <Pane height='100%' display='flex' justifyContent='center'>
      <LoginForm />
    </Pane> :
    <Redirect to='/admin' />
  )
}

export default LoginPage
