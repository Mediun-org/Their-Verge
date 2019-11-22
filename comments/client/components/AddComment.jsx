import React from 'react';
import $ from 'jquery';

class AddComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        userId: 100,
        text: '',
        date: ''
      }
    };
    this.sendComment = this.sendComment.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlerNewComment = this.handlerNewComment.bind(this);
  }

  handleInputChange(e) {
    const target = e.target.name;
    const value = e.target.value;
    this.setState({
      data: {
        ...this.state.data,
        [target]: value,
        date: Date(Date.now()).toString()
      }
    });
  }

  handlerNewComment() {
    var newComment = {
      userId: this.state.data.userId,
      text: this.state.data.text,
      date: this.state.data.date
    };
    this.props.action(newComment);
  }

  sendComment() {
    console.log(window.location.href);
    var path = window.location.href.split('=');
    var id = parseInt(path[1]);
    var id = path[1];
    $.ajax({
      url: '/sendComment/' + id,
      type: 'POST',
      data: this.state.data,
      success: function(data) {
        console.log(data);
      },
      error: function(err) {
        alert('failure');
      }
    });
    this.setState({ data: { text: '' } });
  }

  render() {
    return (
      <div className='addComment'>
        <input
          type='text'
          name='text'
          placeholder='Write your comment here :)'
          value={this.state.data.text}
          onChange={this.handleInputChange}
        />
        <button
          onClick={() => {
            this.sendComment();
            this.handlerNewComment();
          }}
        >
          Click
        </button>
      </div>
    );
  }
}

export default AddComment;
