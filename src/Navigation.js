import React, { Component } from 'react';

class Navigation extends Component {
  render() {
    const {onRouteChange} = this.props;
    
    return (
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p onClick = {() => this.props.onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
        <p onClick = {() => this.props.onRouteChange('login')} className='f3 link dim black underline pa3 pointer'>Login</p>
      </nav>
    );
  }
}

export default Navigation;
