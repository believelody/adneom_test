import React, {useEffect} from 'react'
import { Pane, Text } from 'evergreen-ui'
import { useAppHooks } from '../context'
import quizzes from '../data/quizz.json'
import { PAGE_LOADED } from '../reducers/pageReducer'

const QuizzPage = ({ match }) => {
  const {usePage, useAuth, history} = useAppHooks()
  const [pageState, dispatchPage] = usePage
  const [{user}, dispatchAuth] = useAuth

  useEffect(() => {
    dispatchPage({ type: PAGE_LOADED, payload: {pageLoaded: '/quizz'} })
    if (user) {
      console.log(quizzes[user.language])
    }
  }, [])

  return (
    <Pane>
      <Text>Quizz Page</Text>
    </Pane>
  )
}

export default QuizzPage
