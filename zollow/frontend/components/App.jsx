import React from 'react';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter,
  withRouter
} from 'react-router-dom';
import Example from './main-backgroundimg/background'

import SplashPage from './splash/splash_page_container'
import PropertyIndex from './property_index/property_index_container'
import Header from './header/header'


const App = (props) => {
  // debugger
  let splashPath = '/';
  switch(props.location.pathname) {
    case '/login':
      splashPath = '/login';
      break;
    case '/signup':
      splashPath = '/signup';
      break;
    default:
      splashPath = '/';
      break;
  }
  return (<div className="main-page-image">
    <Header/>
    <Route exact path={splashPath} component={Example} />
    <Switch> 
      <Route exact path="/" component={SplashPage} />

      <Route path='/' component={PropertyIndex} />
    </Switch>
   
  </div>)
};

export default withRouter(App);