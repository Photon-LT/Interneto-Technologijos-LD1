import React, { Component } from 'react';
import './App.css';
import Navigation from './Navigation';
import Particles from 'react-particles-js';
import 'tachyons';
import SignIn from './Login';
import Register from './Register';
import Home from './Home';
import Profile from './Profile';

const particleOptions = {
  particles: {
    number: {
      value: 1, 
      density: {
        enable: true,
        value_area: 3
      }
    }
  }
};

class App extends Component {
  constructor()
  {
    super();
    this.state = {
      route: 'home',
      isLoggedIn: false,
      handleSubmitted: 'test'
    };
  }

  onRouteChange = (route)=>
  {
    this.setState({route: route});
    if(this.state.route==='login' && route==='home')this.setState({isLoggedIn: true});
    if(route==='logout')
    {
      this.setState({isLoggedIn: false});
      this.setState({route: 'home'});
    }
  }

  onHandleSubmit = (handle) =>
  {
    this.setState({handleSubmitted: handle});
  }

  render() {
    const {route, isLoggedIn, handleSubmitted} = this.state;

    return (
      <div className="App">
        <Particles className="particles" params={particleOptions}/>
        <Navigation onRouteChange={this.onRouteChange} isLoggedIn={isLoggedIn}/>
        {
        route === 'login' ? 
        <SignIn onRouteChange={this.onRouteChange}/> :
        route === 'register' ?
        <Register onRouteChange={this.onRouteChange}/> :
        route === 'home' ?
        <Home onRouteChange={this.onRouteChange} onHandleSubmit={this.onHandleSubmit}/> :
        <Profile onRouteChange={this.onRouteChange} handle={handleSubmitted}/>
        }
      </div>
    );
  }
}

export default App;