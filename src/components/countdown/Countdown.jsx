import React, { useState, useEffect } from 'react'
import Moment from 'react-moment'
import { Pane, Badge, Pill } from 'evergreen-ui'
import useCount from '../../hooks/useCount'
import useDelay from '../../hooks/useDelay'

const Countdown = () => {
  const START = 1
  const [minCount, secCount, timesUp] = useCount(START)
  const [minDelay, secDelay] = useDelay(timesUp)

  // console.log(minDelay)

  return (
      !timesUp ?
      <Pane>
        <Badge size={500}>
          {minCount < 10 ? `0${minCount}` : minCount}:{secCount < 10 ? `0${secCount}` : secCount}
        </Badge>
      </Pane> :
      <Pane>
        <Badge size={500} color='red'>
          +{minDelay < 10 ? `0${minDelay}` : minDelay}:{secDelay < 10 ? `0${secDelay}` : secDelay}
        </Badge>
      </Pane>
  )
}

export default Countdown
