import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/root';
import configureStore from './store/store';
import * as PropertyApiUtil from './actions/property_actions';
import HomeIndex from './components/property_index/property_index'


document.addEventListener("DOMContentLoaded", ()=>{
  let store;
  window.fetchProperties = PropertyApiUtil.fetchProperties
  window.fetchProperty = PropertyApiUtil.fetchProperty
  window.createProperty = PropertyApiUtil.createProperty
  window.updateProperty = PropertyApiUtil.updateProperty
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

  window.dispatch = store.dispatch;
  window.getState = store.dispatch;
  window.fetchProperties = fetchProperties;


  let root = document.getElementById('root')
  ReactDOM.render(<Root store={store}/>, root)
})