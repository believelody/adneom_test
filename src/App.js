import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Pane } from 'evergreen-ui'
import Main from './components/main/Main';
import Loading from './components/loading/Loading';

function App() {
  return (
    <BrowserRouter>
      <Pane minHeight='100vh'>
        <Main />
        <Loading />
      </Pane>
    </BrowserRouter>
  );
}

export default App;
