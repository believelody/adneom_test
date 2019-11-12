import React, {useEffect} from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Pane } from 'evergreen-ui'
import Header from './components/headers/Header';
import Main from './components/main/Main';
import Loading from './components/loading/Loading';
import Modal from './components/modal/Modal';
import { useAppHooks } from './context';
import { getUser } from './utils/user.util';
import { SET_LOADING } from './reducers/loadingReducer';
import { getCandidats } from './utils/candidat.util';
import { GET_ALL_CANDIDATS } from './reducers/candidatReducer';

function App() {
  const {useAuth, useCandidat} = useAppHooks()
  const [{ isConnect }, dispatchAuth] = useAuth
  const [{ candidats }, dispatchCandidat] = useCandidat

  useEffect(() => {
    if (getCandidats() && candidats.length === 0) {
      dispatchCandidat({ type: GET_ALL_CANDIDATS, payload: { candidats: getCandidats() } })
    }
  }, [getCandidats])

  useEffect(() => {
    if (!isConnect && getUser()) {
      dispatchAuth({ type: SET_LOADING, payload: {user: getUser()} })
    }
  }, [getUser])

  return (
    <BrowserRouter>
      <Pane minHeight='100vh'>
        <Header />
        <Main />
        <Loading />
        <Modal />
      </Pane>
    </BrowserRouter>
  );
}

export default App;
