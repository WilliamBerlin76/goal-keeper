import React from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';

import Register from './components/auth/authForm';
import Nav from './components/nav/nav';
import Dashboard from './components/dashboard/dashboard';
import GoalList from './components/goals/goalList';

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
        <PrivateRoute 
          path='/:catId/goals' 
          component={GoalList}
        />
      </Switch>
    </>
  );
};

export default App;
