import React, {useEffect, useState} from 'react'
import {Pane} from 'evergreen-ui'
import QuizzHeader from './QuizzHeader'
import LandingHeader from './LandingHeader'
import { useAppHooks } from '../../context'

const Header = ({ location }) => {
  const { useAuth, usePage, history } = useAppHooks()
  const [{isConnected}, dispatchAuth] = useAuth
  const [{pageLoaded}, dispatcthPage] = usePage

  return (
    <Pane>
      {
        pageLoaded === '/quizz' ?
        <QuizzHeader /> :
        <LandingHeader />
      }
    </Pane>
  )
}

export default Header
