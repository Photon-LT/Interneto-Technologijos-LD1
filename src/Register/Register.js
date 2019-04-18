import React, {Component} from 'react';

class Register extends Component{

    register = () => 
    {
        const {onRouteChange} = this.props;
        const email = document.getElementById('register-email').value;
        const pass = document.getElementById('register-pass').value;
        const cpass = document.getElementById('register-cpass').value;
        console.log(JSON.stringify({user: {email,pass,cpass}}));
        
        fetch('/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user: {email,pass,cpass}})
            })
            .then((res) => res.json())
            .then((data) =>  {
                console.log(data);
                if(data.status !== 'ok')
                    alert(data.message);
                else
                    {
                        alert(data.message);
                        onRouteChange('login');
                    }
            })
            .catch((err)=>console.log(err))
    }

    render()
    {
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-75-m w-50-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0 center">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-white w-100" type="email" name="email-address"  id="register-email"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-white w-100" type="password" name="password"  id="register-pass"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Confirm password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-white w-100" type="password" name="cpassword"  id="register-cpass"/>
                        </div>
                        </fieldset>
                        <div>
                            <p id="register-error"></p>
                        </div>
                        <div className="">
                        <input onClick={() => this.register()} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="Register"/>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Register;