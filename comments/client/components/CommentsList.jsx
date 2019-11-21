import React from "react";
// import $ from "jquery";
import Comment from './Comment.jsx';


class CommentsList extends React.Component {
  constructor(props) {
  	super(props);
  	// this.state = {

  	// };

  }

  render(){
    return(
      <div>

				{this.props.comments.map((comment , index) =>
					<Comment key={index} comment ={comment} ></Comment>
				)}
				
      </div>
            
    )
	}
	
}

export default CommentsList;