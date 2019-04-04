import React, { Component } from 'react';

class HandleField extends Component {
  render() {
    const {onRouteChange,onHandleSubmit} = this.props;
    return (
      <div className="">
      <input className="pa2 input-reset ba bg-transparent hover-white w-50" type="text" name="handle-input"  id="handle-input" placeholder="Enter codeforces handle"/>
          <input onClick={() => {
            onHandleSubmit(document.getElementById('handle-input').value);
            onRouteChange('profile');
            }} className="b ph3 input-reset pv2 ba b--black bg-transparent grow pointer f5 dib ma2" type="button" value="Go"/>
      </div>
    );
  }
}

export default HandleField;
