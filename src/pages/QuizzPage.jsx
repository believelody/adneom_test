import React, {useEffect} from 'react'
import { Pane, Text } from 'evergreen-ui'
import { useAppHooks } from '../context'
import { PAGE_LOADED } from '../reducers/pageReducer'

const QuizzPage = () => {
  const {usePage, history} = useAppHooks()
  const [pageState, dispatchPage] = usePage

  useEffect(() => {
    dispatchPage({ type: PAGE_LOADED, payload: {pageLoaded: '/quizz'} })
  }, [])

  console.log(history.action)

  return (
    <Pane>
      <Text>Quizz Page</Text>
    </Pane>
  )
}

export default QuizzPage
