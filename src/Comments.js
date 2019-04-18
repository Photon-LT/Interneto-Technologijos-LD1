import React, {Component} from 'react';

class Comments extends Component{

    postComment = () =>
    {
        const {token, email} = this.props.user;
        const {handle} = this.props;
        const content = document.getElementById('comment-content').value;
        
        fetch('/post/comment', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({token,handle,content,email})
            })
            .then((res) => res.json())
            .then((data) =>  {
                console.log(data);
                this.props.fetchComments();
            })
            .catch((err)=>console.log(err))
    }

    render()
    {
        const {commentsData, user} = this.props;

        return (
            <div>
                {
                    commentsData.status === 'none' ?
                    <p>No comments found.</p> :
                    commentsData.status === 'fail' ?
                    <p>Error</p> :
                    commentsData.comments.map((comment, index) => (
                    <article className="br3 ba b--black-10 mv4 mw9 shadow-5 center pa4 ma2">
                    <p className="db fw6 lh-copy f6" >{comment.posterHandle}</p>
                    <p>{comment.content}</p>
                    </article>
                    ))
                }
                <br />
                { 
                (user!== null && user.hasOwnProperty('handle') && user.handle) ?
                <div>
                    <textarea className="pa2 input-reset ba bg-transparent hover-white w-100 " style={{resize: "none"}} id="comment-content"/>
                    <br />
                    <input onClick={() => this.postComment()} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="Post Comment"/>
                </div>
                :
                <p>Only registered users with verified handle can post comments</p>
                }
            </div>
        );
    }
}

export default Comments;