import React, { Component } from 'react';

class HandleField extends Component {
  render() {
    const {onRouteChange,onHandleSubmit} = this.props;
    return (
      <div className="f3 pa3 flex-wrap justify-center">
      <input className="pa3 ma2 ba bg-transparent hover-white" type="text" id="handle-input" placeholder="Enter codeforces handle"/>
          <input onClick={() => {
            onHandleSubmit(document.getElementById('handle-input').value);
            onRouteChange('profile');
            }} 
            className="pa3 input-reset ba b--black bg-transparent grow pointer f5 dib ma2" type="button" value="Go" />
      </div>
    );
  }
}

export default HandleField;
