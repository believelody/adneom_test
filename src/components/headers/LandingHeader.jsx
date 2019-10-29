import React from 'react'
import { Pane, Heading } from 'evergreen-ui'
import Logo from '../logo/Logo'

const LandingHeader = () => {
    return (
        <Pane backgroundColor='#ccc' elevation={1} height={75} display='flex' alignItems='center' justifyContent='space-around'>
           <Logo logo='logo2' height={120} />
           <Heading size={700}>
               Positive challenge
           </Heading>
        </Pane>
    )
}

export default LandingHeader
