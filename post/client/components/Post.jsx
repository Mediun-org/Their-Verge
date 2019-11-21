import React, { Component } from 'react';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';

export default class Post extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div class='main-contaner'>
          <ul class='related-topic'>
            <li class='corner-border'>
              <a href='#'>{this.props.auth.email}</a>
            </li>
            <li class='corner-border'>
              <a href='#'>TECH</a>
            </li>
          </ul>
          {/* {this.props.topic.length ? (
            <h1 id='page-title'>{this.props.topic[0].title}</h1>
          ) : null} */}
          {/* <p id='entry-summary'>{this.props.topic.sammary}</p> */}
          <div>
            <span class='page-creater'> By </span>
            {/* {this.props.auth.length ? (
              <span class='page-creater page-creater-pink'>
                {' '}
                {this.props.auth[0].name}{' '}
              </span>
            ) : null} */}
            <span class='page-creater'> Nov 2, 2019, 3:22pm EDTs </span>
          </div>
          <ul id='user-contact'>
            <li>
              <a href='#' id='face-user'>
                <FaFacebookF />
              </a>
            </li>
            <li>
              <a href='#' id='twetter-user'>
                <FaTwitter />
              </a>
            </li>
          </ul>
          <div class='left-main-contant'>
            <div>
              <img
                // src={
                //   this.props.topic.length ? this.props.topic[0].img_url : null
                // }
                class='img-topic'
              ></img>
            </div>
            <p id='page-topic'>
              {/* {this.props.topic.length ? this.props.topic[0].body : null} */}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
