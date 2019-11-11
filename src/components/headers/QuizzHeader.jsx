import React from 'react'
import { Pane } from 'evergreen-ui'
import Logo from '../logo/Logo'
import Countdown from '../countdown/Countdown'

const QuizzHeader = () => {
    return (
      <Pane backgroundColor='#f5f6fa' elevation={1} height={75} display='flex' alignItems='center' justifyContent='space-around'>
        <Logo logo='logo1' height={80} />
        <Countdown />
      </Pane>
    )
}

export default QuizzHeader
