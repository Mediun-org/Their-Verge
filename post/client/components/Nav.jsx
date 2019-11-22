import React, { Component } from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaRss,
  FaSearch,
  FaUserAlt
} from 'react-icons/fa';

import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react';
import $ from 'jquery';

import JWT from 'jsonwebtoken';
import Cookies from 'js-cookie';

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      signUp: {
        name: '',
        email: '',
        password: '',
        imgUrl: ''
      },
      login: {
        email: '',
        password: ''
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.signUp = this.signUp.bind(this);
    this.login = this.login.bind(this);
  }
  componentDidMount() {
    this.getToken();
  }
  handleInputChange(e) {
    const target = e.target.name;
    const value = e.target.value;
    this.setState({
      signUp: {
        ...this.state.signUp,
        [target]: value
      }
    });
    this.setState({
      login: {
        ...this.state.login,
        [target]: value
      }
    });
  }

  signUp() {
    var that = this;
    $.ajax({
      url: 'http://localhost:3000/signup',
      type: 'POST',
      data: that.state.signUp,
      success: function(data) {
        console.log(data);
      }
    });
    this.setState({
      signUp: { name: '', email: '', password: '', imgUrl: '' }
    });
  }

  login() {
    var that = this;
    $.ajax({
      url: 'http://localhost:3000/signin',
      type: 'POST',
      data: {
        email: that.state.login.email,
        password: that.state.login.password
      },
      success: function(data) {
        window.location.reload();
      }
    });
  }
  getToken() {
    if (Cookies.get('token')) {
      const token = Cookies.get('token');
      if (token) {
        var decoded = JWT.verify(token, process.env.jwtSecret);
        this.setState({ user: decoded.name });
      }
    }
  }

  logout() {
    $.get('http://localhost:3000/logout');
    window.location.reload();
  }
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

          {this.state.user ? (
            <div class='user-icon'>
              Welcome {this.state.user}
              <Button
                style={{
                  margin: '0px 10px 0px 10px',
                  backgroundColor: 'black',
                  color: 'white',
                  padding: 0
                }}
                onClick={this.logout.bind(this)}
              >
                Logout{' '}
                <Icon style={{ margin: '0px 0px 0px 5px' }} name='power off' />
              </Button>
            </div>
          ) : (
            <div class='user-icon'>
              <Modal
                trigger={
                  <Button
                    style={{
                      backgroundColor: 'black',
                      color: 'white',
                      padding: 0
                    }}
                  >
                    Login
                  </Button>
                }
                basic
                size='small'
              >
                <Header icon='at' content='Login Screen' />
                <Modal.Content>
                  <p
                    style={{
                      fontSize: '22px'
                    }}
                  >
                    Please enter your Email and Password
                  </p>
                  <Form>
                    <Form.Field>
                      <label>Email</label>
                      <input
                        name='email'
                        value={this.state.login.email}
                        onChange={this.handleInputChange}
                        placeholder='Email'
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Password</label>
                      <input
                        name='password'
                        value={this.state.login.password}
                        onChange={this.handleInputChange}
                        type='password'
                        placeholder='Password'
                      />
                    </Form.Field>
                  </Form>
                </Modal.Content>
                <Modal.Actions>
                  <Button onClick={this.login} color='green' inverted>
                    <Icon name='terminal' /> Login
                  </Button>
                </Modal.Actions>
              </Modal>
              <span
                style={{
                  margin: '0px 10px 0px 10px'
                }}
              >
                |
              </span>
              <Modal
                trigger={
                  <Button
                    style={{
                      backgroundColor: 'black',
                      color: 'white',
                      padding: 0
                    }}
                  >
                    Signup
                  </Button>
                }
                basic
                size='small'
              >
                <Header icon='at' content='Signup Screen' />
                <Modal.Content>
                  <p
                    style={{
                      fontSize: '22px'
                    }}
                  >
                    Please enter your Name,Email,Password and Picture
                  </p>
                  <Form>
                    <Form.Field>
                      <label>Name</label>
                      <input
                        name='name'
                        value={this.state.signUp.name}
                        onChange={this.handleInputChange}
                        placeholder=' Name'
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Email</label>
                      <input
                        name='email'
                        value={this.state.signUp.email}
                        onChange={this.handleInputChange}
                        placeholder='Email'
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Password</label>
                      <input
                        name='password'
                        value={this.state.signUp.password}
                        onChange={this.handleInputChange}
                        type='password'
                        placeholder='Password'
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Picture URL</label>
                      <input
                        name='imgUrl'
                        value={this.state.signUp.imgUrl}
                        onChange={this.handleInputChange}
                        placeholder='Picture Url'
                      />
                    </Form.Field>
                  </Form>
                </Modal.Content>
                <Modal.Actions>
                  <Button onClick={this.signUp} color='green' inverted>
                    <Icon name='save' /> Signup
                  </Button>
                </Modal.Actions>
              </Modal>
            </div>
          )}
        </div>
      </div>
    );
  }
}
