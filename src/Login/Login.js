import React, {Component} from 'react';

class Login extends Component{

    login = () => 
    {
        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-pass').value;
        console.log(JSON.stringify({user: {email,pass}}));
        
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user: {email,pass}})
            })
            .then((res) => res.json())
            .then((data) =>  {
                console.log(data);
                if(data.status !== 'ok')
                    alert(data.message);
                else
                    this.props.onLogin(data.user);
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
                        <legend className="f1 fw6 ph0 mh0 center">Login</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-white w-100" type="email" name="email-address"  id="login-email"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-white w-100" type="password" name="password"  id="login-pass"/>
                        </div>
                        </fieldset>
                        <div className="">
                        <input onClick={() => this.login()} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Login"/>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Login;