import React, { Component } from 'react';

class Navigation extends Component {
  render() {
    const {onRouteChange, isLoggedIn} = this.props;
    
    return (
      isLoggedIn ?
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p onClick = {() => onRouteChange('home')} className='f3 link dim black underline pa3 pointer'>Home</p>
        <p onClick = {() => onRouteChange('profile')} className='f3 link dim black underline pa3 pointer'>Profile</p>
        <p onClick = {() => onRouteChange('logout')} className='f3 link dim black underline pa3 pointer'>Logout</p>
      </nav> :
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p onClick = {() => onRouteChange('home')} className='f3 link dim black underline pa3 pointer'>Home</p>
        <p onClick = {() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
        <p onClick = {() => onRouteChange('login')} className='f3 link dim black underline pa3 pointer'>Login</p>
      </nav>
    );
  }
}

export default Navigation;
