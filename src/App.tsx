import React from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';

import Register from './components/auth/authForm';
import Nav from './components/nav/nav';
import Dashboard from './components/dashboard/dashboard';

import PrivateRoute from './utils/PrivateRoute';

const App: React.FC = () => {
  return (
    <>
      <Nav/>
      <Switch>
        <Route 
          path='/register'
          render={props => <Register type='register' {...props}/>}
        />
        <Route 
          path='/login'
          render={props => <Register type='login' {...props}/>}
        />
        <PrivateRoute path='/dashboard' component={Dashboard} />
      </Switch>
    </>
  );
};

export default App;
