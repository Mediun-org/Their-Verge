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
              <a class='active' href='#'>
                TECH <span class='arrow-down'></span>
              </a>
            </li>
            <li>
              <a href='#'>
                REVIEWS <span class='arrow-down'></span>
              </a>
            </li>
            <li>
              <a href='#'>
                SCIENCE <span class='arrow-down'></span>
              </a>
            </li>
            <li>
              <a href='#'>
                CREATORS <span class='arrow-down'></span>
              </a>
            </li>
            <li>
              <a href='#'>
                ENTERTAINMENT <span class='arrow-down'></span>
              </a>
            </li>
            <li>
              <a href='#'>
                VIDEO <span class='arrow-down'></span>
              </a>
            </li>
            <li>
              <a href='#'>
                MORE <span class='arrow-down'></span>
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
          <div class='user-icon'>
            <a href='#'>
              <FaUserAlt />
            </a>
          </div>
          <div class='user-icon'>
            <a href='#'>
              <FaSearch />
            </a>
          </div>
        </div>
      </div>
    );
  }
}
