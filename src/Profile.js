import React, {Component} from 'react';
import Statistics from './Statistics';
import Comments from './Comments';
import ProfileInfo from './ProfileInfo';

class Profile extends Component{
    constructor()
    {
        super();
        this.state = {
            isFetchDone: false,
            fetchData: {},
            areCommentsLoaded: false,
            comments: {},
            isUserRegisteredOnOurSite: false,
            user: {}
        };
    }

    fetchDataFromCodeforces = () =>
    {
        this.setState({isFetchDone: false});
        const {handle} = this.props;
        const url = 'https://codeforces.com/api/user.status?handle=' + handle;
        fetch(url)
        .then(resp => resp.json())
        .then(json => {
            this.setState({fetchData: json});
            this.setState({isFetchDone: true});
        })
        .catch(error => console.log(error));
    }

    fetchUserInfoData = () =>
    {
        fetch(`/user/${this.props.handle}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            })
            .then((res) => res.json())
            .then((data) =>  {
                console.log(data);
                if(data.status !== 'ok')
                    alert(data.message);
                else
                    {
                        this.setState({isUserRegisteredOnOurSite: true});
                        this.setState({user: data.data});
                    }
            })
            .catch((err)=>console.log(err))
    }

    fetchComments = () =>
    {
        
    }

    componentDidMount()
    {
        this.fetchDataFromCodeforces();
    }

    componentDidUpdate(prevProps)
    {
        if(this.props.handle !== prevProps.handle)
        this.fetchDataFromCodeforces();
    }

    render()
    {
        const {fetchData, user} = this.state;
        return (
            <div>
                <article className="br3 ba b--black-10 mv4 mw9 shadow-5 center pa4 ma2">
                    {
                        this.state.isUserRegisteredOnOurSite ?
                        <ProfileInfo user={user}/>
                    : 
                    <p>This codeforces handle is not associated with any codeforces visualizer account. So no profile data is included</p>
                    }
                </article>
                <article className="br3 ba b--black-10 mv4 mw9 shadow-5 center pa4 ma2">
                    {
                        this.state.isFetchDone && fetchData.status==='OK' ?
                        <Statistics fetchData={fetchData.result} />
                    : this.state.isFetchDone ?
                    <p>Failed to fetch data. Make sure you have entered correct handle</p> :
                    <p>Loading...</p>
                    }
                </article>
                <article className="br3 ba b--black-10 mv4 mw9 shadow-5 center pa4 ma2">
                    {
                        this.state.areCommentsLoaded ?
                        <Comments/>
                    : 
                    <p>Loading...</p>
                    }
                </article>
            </div>
        );
    }
}

export default Profile;