import { useState, useEffect } from 'react'

export default (timesUp) => {
  const [minDelay, setMin] = useState(0)
  const [secDelay, setSec] = useState(0)
  // const [timesUp, setTimesUp] = useState(false)

  const minDelayInterval = null
  const secDelayInterval = null

  useEffect(() => {
    if (timesUp) {
      setInterval(() => {
        setSec(prevSec => {
          console.log(prevSec)
          if (prevSec === 59) {
            console.log(prevSec)
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


  return [minDelay, secDelay]
}
