import React, {Component} from 'react';

class Settings extends Component{

    componentDidUpdate()
    {
        const {user} = this.props;
        if(user !== null && user.hasOwnProperty('handle'))
        document.getElementById('settings-handle').value = user.handle;

        if(user !== null && user.hasOwnProperty('aboutMe'))
        document.getElementById('settings-about-me').value = user.aboutMe;
    }

    changePassword = () => 
    {
        const {token, email} = this.props.user;
        const pass = document.getElementById('settings-old-pass').value;
        const newPass = document.getElementById('settings-new-pass').value;
        const newPass2 = document.getElementById('settings-new-pass2').value;
        console.log(JSON.stringify({user: {pass,newPass,newPass2,token,email}}));
        
        fetch('/change/pass', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user: {pass,newPass,newPass2,token,email}})
            })
            .then((res) => res.json())
            .then((data) =>  {
                console.log(data);
                    alert(data.message);
            })
            .catch((err)=>console.log(err))
    }

    verifyHandle = () => 
    {
        const {token,email} = this.props.user;
        const handle = document.getElementById('settings-handle').value.toLowerCase();
        console.log(JSON.stringify({user: {handle,token,email}}));
        
        fetch('/verify/handle', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user: {handle,token,email}})
            })
            .then((res) => res.json())
            .then((data) =>  {
                console.log(data);
                alert(data.message);
            })
            .catch((err)=>console.log(err))
    }

    updateAboutMe = () => 
    {
        const {token,email} = this.props.user;
        const aboutMe = document.getElementById('settings-about-me').value;
        console.log(JSON.stringify({user: {aboutMe,token,email}}));
        
        fetch('/update/about/me', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user: {aboutMe,token,email}})
            })
            .then((res) => res.json())
            .then((data) =>  {
                console.log(data);
                alert(data.message);
            })
            .catch((err)=>console.log(err))
    }

    deleteAccount = () => 
    {
        const {token,email} = this.props.user;
        const {onRouteChange} = this.props;
        const pass = document.getElementById('settings-delete-pass').value;
        console.log(JSON.stringify({user: {pass,token,email}}));
        
        fetch('/delete/account', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user: {pass,token,email}})
            })
            .then((res) => res.json())
            .then((data) =>  {
                console.log(data);
                alert(data.message);
                if(data.status === 'ok')
                onRouteChange('logout');
            })
            .catch((err)=>console.log(err))
    }

    render()
    {
        return (
            <div>
                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80 center tc">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0 center">Settings</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Current Password</label>
                            <input className="pa2 input-reset ba bg-transparent hover-white w-100" type="password" id="settings-old-pass"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">new password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-white w-100" type="password" id="settings-new-pass"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Confirm new password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-white w-100" type="password" id="settings-new-pass2"/>
                        </div>
                        </fieldset>
                        <div className="">
                        <input onClick={() => this.changePassword()} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="Change password"/>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Codeforces handle</label>
                            <input className="pa2 input-reset ba bg-transparent hover-white w-100" type="text" name="email-address"  id="settings-handle"/>
                        </div>
                        </fieldset>
                        <div className="">
                        <input onClick={() => this.verifyHandle()} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="Verify handle"/>
                        </div>
                    </div>

                    <br />
                    <br />
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">About me</label>
                            <textarea className="pa2 input-reset ba bg-transparent hover-white w-100 " style={{resize: "none"}} id="settings-about-me"/>
                        </div>
                        </fieldset>
                        <div className="">
                        <input onClick={() => this.updateAboutMe()} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="Update"/>
                        </div>
                    </div>

                    <br />
                    <br />
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Password</label>
                            <input className="pa2 input-reset ba bg-transparent hover-white w-100" type="password" name="email-address"  id="settings-delete-pass"/>
                        </div>
                        </fieldset>
                        <div className="">
                        <input onClick={() => this.deleteAccount()} className="b ph3 pv2 input-reset ba b--red bg-transparent grow pointer f6 dib" type="button" value="Delete Account"/>
                        </div>
                    </div>
                </main>
            </article>
            </div>
        );
    }
}

export default Settings;