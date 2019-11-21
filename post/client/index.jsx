import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Post from './components/Post.jsx';
import Nav from './components/Nav.jsx';
import Next from './components/Next.jsx';
import '../public/style.css';

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
    console.log(data);
    this.setState({
      articls: data[0],
      auth: data[1]
    });
  }

  retriveData() {
    var that = this;
    var path = window.location.href.split('=');
    console.log(path);
    var article_id = parseInt(path[1]);
    console.log(article_id);
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
    return (
      <div>
        {this.state.auth.length === 0 ? null : (
          <>
            <h2>{this.state.auth.name}</h2>
            <Nav />
            {/* <Post topic={this.auth.article} auth={this.state.auth} /> */}
            <Post auth={this.state.auth} />
            {/* <Next article={this.state.articls} /> */}{' '}
          </>
        )}
      </div>
    );
  }
}
ReactDOM.render(<Article />, document.getElementById('post'));
