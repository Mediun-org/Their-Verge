import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Post from './components/Post.jsx';
import Nav from './components/Nav.jsx';
import Rating from './components/Rating.jsx';
import '../public/style.css';
// import { Rating } from 'semantic-ui-react';

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articls: [],
      auth: []
    };
  }

  componentDidMount() {
    this.retriveData();
  }

  updateState(data) {
    // console.log(data);
    this.setState({
      articls: data[0],
      auth: data[1]
    });
  }

  retriveData() {
    var that = this;
    var path = window.location.href.split('=');
    var article_id = parseInt(path[1]);
    $.ajax({
      url: '/article/' + article_id,
      method: 'GET',
      success: function(data) {
        that.updateState(data);
      },
      error: function(error) {
        console.log(error);
      }
    });
  }

  render() {
    console.log("the author: ", this.state.auth);
    console.log("the topic: ", this.state.articls.topic);
    return (
      <div>
        {this.state.auth.length === 0 ? null : (
          <>
            <Nav />
            <Post topic={this.state.articls} auth={this.state.auth} />
            {/* <Next article={this.state.articls} />{' '} */}
            <Rating />
          </>
        )}
      </div>
    );
  }
}
const styleLink = document.createElement('link');
styleLink.rel = 'stylesheet';
styleLink.href =
  'https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css';
document.head.appendChild(styleLink);

ReactDOM.render(<Article />, document.getElementById('post'));
