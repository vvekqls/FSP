import React from 'react';
import GreetingContainer from './greeting/greeting_container';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';
import Example from './main-backgroundimg/background'
import SignupFormContainer from './session_form/signup_form_container';
import LoginFormContainer from './session_form/login_form_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Modale from './modal/modal'
import BenchMap from './map/map'

const App = () => (
  <div className="main-page-image">
    <header className="header-container">
    <GreetingContainer />
    <Modale/>
    </header>
    <Switch>
      <Example />
      <BenchMap />
      <AuthRoute path="/login" component={LoginFormContainer} />
      <AuthRoute path="/signup" component={SignupFormContainer} />
    </Switch>
   
  </div>
);

export default App;