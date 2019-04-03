import React, { Component } from 'react';
import './App.css';
import Navigation from './Navigation';
import HandleField from './HandleField';
import Particles from 'react-particles-js';
import 'tachyons';
import SignIn from './Login';
import Register from './Register';
import Home from './Home';

const particleOptions = {
  particles: {
    number: {
      value: 30, 
      density: {
        enable: true,
        value_area: 100
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
      isLoggedIn: false //this state value is not updated correctly {yet}
    };
  }

  onRouteChange = (route)=>
  {
    console.log(route);
    this.setState({route: route});
    //this.setState({isLoggedIn: !(route==='login' || route==='register')});
  }

  render() {
    const {route} = this.state;

    return (
      <div className="App">
        <Particles className="particles" params={particleOptions}/>
        <Navigation onRouteChange={this.onRouteChange} />
        {
        route === 'login' ? 
        <SignIn onRouteChange={this.onRouteChange}/> :
        route === 'register' ?
        <Register onRouteChange={this.onRouteChange}/> :
        <Home />
        }
      </div>
    );
  }
}

export default App;
