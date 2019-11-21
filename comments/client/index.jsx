import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import Comment from './components/Comment.jsx';
// import CommentForm from "./components/CommentForm.jsx";
// import CommentsList from "./components/CommentsList.jsx";
// import data from '../dummyData.js';

import '../public/style.css';
import CommentsList from './components/CommentsList.jsx';

class CommentsModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    var that = this;
    console.log(window.location.href);
    var path = window.location.href.split('=');
    var id = parseInt(path[1]);
    var id = path[1];

    $.ajax({
      type: 'GET',
      url: '/comments/' + id,
      success: function(res) {
        that.updateStatus(res);
        console.log(that.state.data);
      }
    });
  }

  updateStatus(myData) {
    this.setState({ data: myData });
  }
  render() {
    return (
      <div className='mainDiv'>
        <div className='mainSection'>
          <div className='commentsHeader'>
            <h1 className='commentsCount'>
              THERE ARE {this.state.data.length} COMMENTS
            </h1>
          </div>

          {/* <div className='commentslist'>
            <CommentsList comments={this.state.data} />
            <CommentExampleComment />
          </div> */}
        </div>
      </div>
    );
  }
}
ReactDOM.render(<CommentsModule />, document.getElementById('comments'));
