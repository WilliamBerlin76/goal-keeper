import React from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';

import Register from './components/auth/authForm';
import Nav from './components/nav/nav';

function App() {
  return (
    <>
      <Nav/>
      <Switch>
        <Route 
          path='/register'
          render={props => <Register type='register'/>}
        />
        <Route 
          path='/login'
          render={props => <Register type='login'/>}
        />
      </Switch>
    </>
  );
};

export default App;
