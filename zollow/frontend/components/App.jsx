import React from 'react';
import GreetingContainer from './greeting/greeting_container';
import PropertyShowContainer from './property_show/property_show_container'
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
import property_index_container from './property_index/property_index_container';


const App = () => (
  <div className="main-page-image">
    <header className="header-container">
    <GreetingContainer />
    <Modale/>
    </header>
      {/* <Example /> */}
    <Switch>
      <AuthRoute path="/login" component={LoginFormContainer} />
      <AuthRoute path="/signup" component={SignupFormContainer} />
      <Route path="/" component={property_index_container} />
      {/* <Route exact path="/" component={PropertyShowContainer} /> */}
    </Switch>
      
    
   
  </div>
);

export default App;