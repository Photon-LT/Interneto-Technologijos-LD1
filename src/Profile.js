import React, {Component} from 'react';
import Statistics from './Statistics';

class Profile extends Component{
    constructor()
    {
        super();
        this.state = {
            isFetchDone: false,
            fetchData: {}
        };
    }

    componentDidMount() {
        const {handle} = this.props;
        const url = 'https://codeforces.com/api/user.status?handle=' + handle;
        fetch(url)
        .then(resp => resp.json())
        .then(json => {
            this.setState({fetchData: json});
            this.setState({isFetchDone: true});
        });
    }

    render()
    {
        const {fetchData} = this.state;
        return (
            <article className="br3 ba b--black-10 mv4 mw10 shadow-5 center pa4 ma2">
                {
                    this.state.isFetchDone && fetchData.status==='OK' ?
                    <Statistics fetchData={fetchData.result} />
                : this.state.isFetchDone ?
                <p>Failed to fetch data. Make sure you have entered correct handle</p> :
                <p>Loading...</p>
                }
            </article>
        );
    }
}

export default Profile;