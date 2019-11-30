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
import { getAdmin, getIsAdmin } from './utils/admin.util';
import { SET_ADMIN, SUCCESS_ADMIN, SUCCESS_AUTH } from './reducers/authReducer';

function App() {
  const {useAuth, useCandidat} = useAppHooks()
  const [{ isConnected, isAdmin }, dispatchAuth] = useAuth
  const [{ candidats }, dispatchCandidat] = useCandidat

  useEffect(() => {
    if (getCandidats()) {
      dispatchCandidat({ type: GET_ALL_CANDIDATS, payload: { candidats: getCandidats() } })
    }
  }, [getCandidats])

  useEffect(() => {
    if (!isConnected && getAdmin()) {
      dispatchAuth({ type: SET_ADMIN, payload: {admins: getAdmin()} })
    }
  }, [getAdmin])

  useEffect(() => {
    if (!isConnected && getUser()) {
      dispatchAuth({ type: SUCCESS_AUTH, payload: {user: getUser()} })
    }
  }, [getUser])

  useEffect(() => {
    if (!isAdmin && getIsAdmin()) {
      dispatchAuth({ type: SUCCESS_ADMIN })
    }
  }, [getIsAdmin])

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
