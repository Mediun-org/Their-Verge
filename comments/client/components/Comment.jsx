import React from "react";


class Comment extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {

    // };

  }

  render(){
    return(
      <div className = 'commentItem'>

				<div className = 'commentItemHeader'>
					<img className = 'autherAvatar' src = {this.props.comment.profilePic}/>
					<h5 className = 'autherName'>{this.props.comment.autherName}</h5>
          
				</div>
        
        
        <p className = 'commentbody'>{this.props.comment.body}</p>
				<p>Posted on 	<a>{this.props.comment.createdAt}</a> </p>

      </div>
    )
  }
}

export default Comment;


