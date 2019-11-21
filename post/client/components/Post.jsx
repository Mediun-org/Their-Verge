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
          {/* {this.props.topic.length ? (
            <h1 id='page-title'>{this.props.topic[0].title}</h1>
          ) : null} */}
          <h1 id='page-title'>{this.props.topic.title}</h1>
          <p id='entry-summary'>{this.props.topic.sammary}</p>
          <div>
            <span className='page-creater'> By </span>
            {/* {this.props.auth.length ? (
              <span className='page-creater page-creater-pink'>
                {' '}
                {this.props.auth[0].name}{' '}
              </span>
            ) : null} */}
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
                // src={
                //   this.props.topic.length ? this.props.topic[0].img_url : null
                // }
                src={this.props.topic.imgUrl}
                className='img-topic'
              ></img>
            </div>
            <p id='page-topic'>
              {/* {this.props.topic.length ? this.props.topic[0].body : null} */}
              {this.props.topic.body}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
