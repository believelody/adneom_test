import { useState, useEffect } from 'react'
import { useAppHooks } from '../context'

export default (start) => {
  const { useQuizz } = useAppHooks()
  const [{ isEnded }, dispatchQuizz] = useQuizz

  const [minCount, setMin] = useState(start)
  const [secCount, setSec] = useState(0)
  const [timesUp, setTimesUp] = useState(false)

  const minCountInterval = null
  const secCountInterval = null

  useEffect(() => {
    setInterval(() => {
      setSec(prevSec => {
        if (prevSec === 0) {
          return 59
        }
        else {
          return prevSec - 1
        }
      })
    }, 1000)

    setInterval(() => {
      setMin(prevMin => {
        return prevMin - 1
      })
    }, 61000)
  }, [])

  useEffect(() => {
    if (minCount === start && secCount === 59) {
      setMin(prevMin => prevMin - 1)
    }

    if (minCount === 0 && secCount === 0) {
      setTimesUp(true)
      clearInterval(minCountInterval)
      clearInterval(secCountInterval)
    }
  }, [secCount])

  useEffect(() => {
    if (isEnded) {
      clearInterval(minCountInterval)
      clearInterval(secCountInterval)
    }
  }, [isEnded])

  return [minCount, secCount, timesUp]
}
