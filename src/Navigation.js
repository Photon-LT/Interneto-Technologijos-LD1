import React, { Component } from 'react';
import HandleField from './HandleField.js';

class Navigation extends Component {
  render() {
    const {onRouteChange, isLoggedIn, onHandleSubmit} = this.props;
    
    return (
      isLoggedIn ?
      <nav style={{display: 'flex', justifyContent: 'space-between', flexWrap: "wrap"}}>
        <div style={{display: 'flex', justifyContent: 'flex-end'}} />
        <HandleField onRouteChange={onRouteChange} onHandleSubmit={onHandleSubmit}/>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p onClick = {() => onRouteChange('home')} className='f3 link dim black underline pa3 pointer'>Home</p>
          <p onClick = {() => onRouteChange('settings')} className='f3 link dim black underline pa3 pointer'>Settings</p>
          <p onClick = {() => onRouteChange('logout')} className='f3 link dim black underline pa3 pointer'>Logout</p>
        </div>
      </nav> :
      <nav style={{display: 'flex', justifyContent: 'space-between', flexWrap: "wrap"}}>
        <div style={{display: 'flex', justifyContent: 'flex-end'}} />
        <HandleField onRouteChange={onRouteChange} onHandleSubmit={onHandleSubmit}/>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p onClick = {() => onRouteChange('home')} className='f3 link dim black underline pa3 pointer'>Home</p>
          <p onClick = {() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
          <p onClick = {() => onRouteChange('login')} className='f3 link dim black underline pa3 pointer'>Login</p>
        </div>
      </nav>
    );
  }
}

export default Navigation;
