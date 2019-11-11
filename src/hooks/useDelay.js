import { useState, useEffect } from 'react'
import { useAppHooks } from '../context'

export default (timesUp) => {
  const { useQuizz } = useAppHooks()
  const [{ isEnded }, dispatchQuizz] = useQuizz

  const [minDelay, setMin] = useState(0)
  const [secDelay, setSec] = useState(0)

  const minDelayInterval = null
  const secDelayInterval = null

  useEffect(() => {
    if (timesUp) {
      setInterval(() => {
        setSec(prevSec => {
          if (prevSec === 59) {
            setMin(prevMin => prevMin + 1)
            return 0
          }
          else {
            return prevSec + 1
          }
        })
      }, 1000)
    }
  }, [timesUp])

  useEffect(() => {
    if (isEnded) {
      console.log('ended')
      clearInterval(minDelayInterval)
      clearInterval(secDelayInterval)
    }
  }, [isEnded])

  return [minDelay, secDelay]
}
