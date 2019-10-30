import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Pane } from 'evergreen-ui'
import Header from './components/headers/Header';
import Main from './components/main/Main';
import Loading from './components/loading/Loading';
import Modal from './components/modal/Modal';

function App() {

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
