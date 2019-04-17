import React, { Component } from 'react';

class HandleField extends Component {
  render() {
    const {onRouteChange,onHandleSubmit} = this.props;
    return (
      <div className="f3 pa3" style={{display: "flex", marginRight: "15%"}}>
      <input className="pa0 ma2 ba bg-transparent hover-white w-100" type="text" name="handle-input"  id="handle-input" placeholder="Enter codeforces handle"/>
          <input onClick={() => {
            onHandleSubmit(document.getElementById('handle-input').value);
            onRouteChange('profile');
            }} 
            style={{display: "inline"}}
            className="ph3 input-reset pv3 ba b--black bg-transparent grow pointer f5 dib ma2" type="button" value="Go" />
      </div>
    );
  }
}

export default HandleField;
