import React from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.scss';

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
      <Switch>
        <Route 
          path='/register'
          render={props => <Register type='Register' {...props}/>}
        />
        <Route 
          path='/login'
          render={props => <Register type='Login' {...props}/>}
        />
        
        <section className='main-comps'>
          <PrivateRoute path='/dashboard' component={Dashboard} />
          <PrivateRoute
            path='/:catId/goals' 
            component={GoalList}
          />
          <PrivateRoute
            path='/:goalId/steps'
            component={StepList}
          />
        </section>
        
      </Switch>
    </>
  );
};

export default App;
