import React from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.scss';

import Landing from './components/landing/landing';
import Register from './components/auth/authForm';
import Nav from './components/nav/nav';
import Dashboard from './components/dashboard/dashboard';
import GoalList from './components/goals/goalList';
import StepList from './components/steps/stepList';

import PrivateRoute from './utils/PrivateRoute';

const App: React.FC = () => {
  return (
    <>
      <Nav/>
      <section className='main-comps'>
        <Switch> 
          <Route 
            exact path='/'
            component={Landing}
          />
          <Route 
            path='/register'
            render={props => <Register type='Register' {...props}/>}
          />
          <Route 
            path='/login'
            render={props => <Register type='Login' {...props}/>}
          />
          <PrivateRoute path='/dashboard' component={Dashboard} />
          <PrivateRoute
            path='/:catId/goals' 
            component={GoalList}
          />
          <PrivateRoute
            path='/:goalId/steps'
            component={StepList}
          />
        </Switch>
      </section>
    </>
  );
};

export default App;
