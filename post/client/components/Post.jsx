import React, { Component } from 'react';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';

export default class Post extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var monthes = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var formatted = new Date(this.props.topic.createdAt);
    var theDate = monthes[formatted.getMonth()] + " " + formatted.getDate() + "," + formatted.getFullYear() + " . ";
    return (
      <div>
        <div className='main-contaner'>
          <ul className='related-topic'>
            <li className='corner-border'>
              <a href="#">TOPIC</a>
            </li>
            <li className='corner-border'>
              <a href='#'>{this.props.topic.topic}</a>
            </li>
          </ul>
          <h1 id='page-title'>{this.props.topic.title}</h1>
          <p id='entry-summary'>{this.props.topic.sammary}</p>
          <div>
            <span className='page-creater'> By </span>
            <span className='page-creater page-creater-pink'>
                {' '}
                {this.props.auth.name}{' '}
              </span>
            <span className='page-creater'> {theDate} </span>
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
          <div className='left-main-contant'>
            <div>
              <img
                src={this.props.topic.imgUrl}
                className='img-topic'
              ></img>
            </div>
            <p id='page-topic'>
              {this.props.topic.body}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
