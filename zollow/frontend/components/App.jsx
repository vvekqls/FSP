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
import SignupFormContainer from './session_form/signup_form_container';
import LoginFormContainer from './session_form/login_form_container';
import Navbar from '../components/navbar/navbar'
import propertyForm from './property_show/property_form'
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
    {/* <header className="header-container">
    <Navbar/>
    <GreetingContainer />
    </header> */}
{/*       
    <Switch>
      <AuthRoute path="/login" component={LoginFormContainer} />
      <AuthRoute path="/signup" component={SignupFormContainer} />
      <Route path="/properties/:propertyId" component={PropertyShowContainer} />
      <Route path="/properties" component={property_index_container} />
      <Route path="/sell" component={propertyForm}/>
    </Switch> */}
    <Header/>
    <Route exact path={splashPath} component={Example} />
    <Switch> 
      <Route exact path="/" component={SplashPage} />

      <Route path='/' component={PropertyIndex} />
    </Switch>
   
  </div>)
};

export default withRouter(App);