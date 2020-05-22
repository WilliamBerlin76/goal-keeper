import React from 'react';
import { Route } from 'react-router-dom'
import './App.css';

import Register from './components/auth/register';

function App() {
  return (
    <>
      <Route 
        exact path='/register'
        render={props => <Register type='register'/>}
      />
      <Route 
        exact path='/login'
        render={props => <Register type='login'/>}
      />
    </>
  );
}

export default App;
