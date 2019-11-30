import React, {useEffect, useState} from 'react'
import { Pane, Text } from 'evergreen-ui'
import { useAppHooks } from '../context'
import quizzes from '../data/quizz.json'
import { PAGE_LOADED } from '../reducers/pageReducer'
import QCMQuizzForm from '../components/forms/QCMQuizzForm'
import { getUser } from '../utils/user.util'

const QuizzPage = ({ match }) => {
  const {usePage, useAuth, history} = useAppHooks()
  const [pageState, dispatchPage] = usePage
  const [authState, dispatchAuth] = useAuth

  const [data, setData] = useState(null)
  const [user, setUser] = useState(getUser())

  useEffect(() => {
    dispatchPage({ type: PAGE_LOADED, payload: {pageLoaded: '/quizz'} })
    setData(quizzes[user.language][+match.params.pageId - 1])
  }, [match.params.pageId])

  console.log(user)

  return (
    <Pane marginX={50}>
      <Text>Quizz Page</Text>
      <QCMQuizzForm data={data} matchParams={match.params} />
    </Pane>
  )
}

export default QuizzPage
