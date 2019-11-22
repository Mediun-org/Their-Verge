import React from 'react';

class Comment extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='commentItem'>
        <div className='commentItemHeader'>
          <img className='autherAvatar' src={this.props.comment.imgUrl} />
          <h5 className='autherName'>{this.props.comment.name}</h5>
        </div>
        <p className='commentbody'>{this.props.comment.text}</p>
        <p>
          Posted on <a>{this.props.comment.date}</a>
        </p>
      </div>
    );
  }
}

export default Comment;
