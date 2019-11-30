import React, { useEffect, useState } from 'react'
import {Redirect} from 'react-router-dom'
import { Pane } from 'evergreen-ui'
import LoginForm from '../components/forms/LoginForm'
import {useAppHooks} from '../context'
import {SET_LOADING, RESET_LOADING} from '../reducers/loadingReducer'
import { getIsAdmin } from '../utils/admin.util'

const LoginPage = () => {
  const {useAuth, useLoading} = useAppHooks()
  const [{isConnected}, dispatchAuth] = useAuth
  const [{loading}, dispatchLoading] = useLoading

  return (
    !getIsAdmin() ?
    <Pane height='auto' width='60%' marginX='auto' marginY={50} backgroundColor='#f5f6fa'>
      <LoginForm />
    </Pane> :
    <Redirect to='/admin' />
  )
}

export default LoginPage
