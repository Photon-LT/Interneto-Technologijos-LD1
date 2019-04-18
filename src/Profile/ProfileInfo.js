import React, {Component} from 'react';

class ProfileInfo extends Component{
    
    render()
    {
        const {user} = this.props;
        return (
            <div>
                <article className="br3 ba b--black-10 mv4 mw9 shadow-5 center pa4 ma2">
                    <p className="db fw6 lh-copy f6" >Email</p>
                    <p>{user.email}</p>
                </article>
                
                <article className="br3 ba b--black-10 mv4 mw9 shadow-5 center pa4 ma2">
                    <p className="db fw6 lh-copy f6" >About me</p>
                    <p>{user.aboutMe}</p>
                </article>
            </div>
        );
    }
}

export default ProfileInfo;