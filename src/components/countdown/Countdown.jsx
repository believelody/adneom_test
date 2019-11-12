import React, { useState, useEffect } from 'react'
import Moment from 'react-moment'
import { Pane, Badge, Pill } from 'evergreen-ui'
import useCount from '../../hooks/useCount'
import useDelay from '../../hooks/useDelay'
import { useAppHooks } from '../../context'
import { QUIZZ_TIME } from '../../reducers/quizzReducer'

const Countdown = () => {
  const START = 3

  const { useQuizz } = useAppHooks()
  const [{isEnded}, dispatchQuizz] = useQuizz

  const [minCount, secCount, timesUp] = useCount(START)
  const [minDelay, secDelay] = useDelay(timesUp)

  useEffect(() => {
    if (isEnded) {
      dispatchQuizz({
        type: QUIZZ_TIME,
        payload: {
          min: START - (minCount + minDelay + 1),
          sec: timesUp ? secDelay : 59 - secCount
        }
      })
    }
  }, [isEnded, timesUp])

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
