import React from 'react'
import { Pane } from 'evergreen-ui'

const Logo = ({ logo, height }) => {
    return (
        <Pane width='auto'>
            <img style={{ height }} src={`${logo}.png`} alt={logo} />
        </Pane>
    )
}

export default Logo
