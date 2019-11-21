import React, { Component } from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaRss,
  FaSearch,
  FaUserAlt
} from 'react-icons/fa';

export default class Nav extends Component {
  render() {
    return (
      <div>
        <div id='nav-par'>
          <div id='logo'>
            <a href='#' id='logo-home'>
              THEVERGE
            </a>
          </div>
          <ul id='main-ul'>
            <li>
              <a className='active' href='#'>
                TECH <span className='arrow-down'></span>
              </a>
            </li>
            <li>
              <a href='#'>
                REVIEWS <span className='arrow-down'></span>
              </a>
            </li>
            <li>
              <a href='#'>
                SCIENCE <span className='arrow-down'></span>
              </a>
            </li>
            <li>
              <a href='#'>
                CREATORS <span className='arrow-down'></span>
              </a>
            </li>
            <li>
              <a href='#'>
                ENTERTAINMENT <span className='arrow-down'></span>
              </a>
            </li>
            <li>
              <a href='#'>
                VIDEO <span className='arrow-down'></span>
              </a>
            </li>
            <li>
              <a href='#'>
                MORE <span className='arrow-down'></span>
              </a>
            </li>
          </ul>
          <ul id='nav-icon'>
            <li>
              <FaFacebookF />
            </li>
            <li>
              <FaTwitter />
            </li>
            <li>
              <FaRss />
            </li>
          </ul>
          <div className='user-icon'>
            <a href='#'>
              <FaUserAlt />
            </a>
          </div>
          <div className='user-icon'>
            <a href='#'>
              <FaSearch />
            </a>
          </div>
        </div>
      </div>
    );
  }
}
