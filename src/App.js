import React, { Component } from 'react';
import './App.css';
import Navigation from './Navigation';
import Particles from 'react-particles-js';
import 'tachyons';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Profile from './Profile';
import Settings from './Settings';

const particleOptions = {
    "particles": {
        "number": {
            "value": 160,
            "density": {
                "enable": false
            }
        },
        "size": {
            "value": 10,
            "random": true,
            "anim": {
                "speed": 2,
                "size_min": 0.1
            }
        },
        "line_linked": {
            "enable": false
        },
        "move": {
            "random": true,
            "speed": 1,
            "direction": "top",
            "out_mode": "out"
        }
    },
};

class App extends Component {
  constructor()
  {
    super();
    this.state = {
      route: 'home',
      isLoggedIn: false,
      handleSubmitted: 'test',
      user: null
    };
  }

  onLogin = (user) =>
  {
    this.setState({user: user});
    this.setState({isLoggedIn: true});
    this.onRouteChange('home');
  }

  onRouteChange = (route)=>
  {
    this.setState({route: route});
    if(route==='logout')
    {
      this.setState({isLoggedIn: false});
      this.setState({user: null});
      this.setState({route: 'home'});
    }
  }

  onHandleSubmit = (handle) =>
  {
    this.setState({handleSubmitted: handle});
  }

  onHandleVerified = (handle, token) =>
  {
    if(!this.state.isLoggedIn)return;
    if(this.state.user.token !== token)return;
    let nwUser = this.state.user;
    nwUser.handle = handle;
    this.setState({user: nwUser});
  }

  render() {
    const {route, isLoggedIn, handleSubmitted, user} = this.state;

    return (
      <div className="App">
        <Particles className="particles" params={particleOptions}/>
        <Navigation onRouteChange={this.onRouteChange} isLoggedIn={isLoggedIn} onHandleSubmit={this.onHandleSubmit}/>
        {
        route === 'login' ? 
        <Login onLogin={this.onLogin}/> :
        route === 'register' ?
        <Register onRouteChange={this.onRouteChange}/> :
        route === 'home' ?
        <Home onRouteChange={this.onRouteChange} /> :
        route === 'settings' ?
        <Settings onRouteChange={this.onRouteChange} user={user} onHandleVerified={this.onHandleVerified}/>:
        <Profile onRouteChange={this.onRouteChange} handle={handleSubmitted} user={user}/>
        }
      </div>
    );
  }
}

export default App;