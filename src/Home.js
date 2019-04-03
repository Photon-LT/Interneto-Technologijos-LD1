import React, {Component} from 'react';

class Login extends Component{

    render()
    {
        return (
            <article className="br3 ba b--black-10 mv4 mw8 shadow-5 center pa4 ma2">
                <p className="f1 b">Yet Another Codeforces visualizer</p>
                <p className="f4 tj">Codeforces is a website that hosts competitive programming contests.
                While the site has lots of various programming problems from various computer science topics,
                users dont have much built-in tools to visualize their progress.
                "Yet Another Codeforces Visualizer" - is a website that makes various diagrams to better visualize 
                codeforcews.com users progress, areas where they excel and where they should train.
                It also allows users to track their friends progress, comment on their profiles and so on.</p>
                <br/>
            </article>
        );
    }
}

export default Login;