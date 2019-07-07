import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/root';
import configureStore from './store/store';
import * as SessionApiUtil from './util/session_api_util'
import * as PropertyApiUtil from './util/property_api_util'

document.addEventListener("DOMContentLoaded", ()=>{
  let store;
  window.fetchProperties = PropertyApiUtil.fecthProperties
  window.fetchProperty = PropertyApiUtil.fetchProperty
  window.updateProperty = PropertyApiUtil.updateProperty
  window.createProperty = PropertyApiUtil.createProperty
  window.deleteProperty = PropertyApiUtil.deleteProperty
  
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: { id: window.currentUser.id }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  let root = document.getElementById('root')
  ReactDOM.render(<Root store={store}/>, root)
})