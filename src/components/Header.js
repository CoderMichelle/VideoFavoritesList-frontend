import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import LoginButton from './LoginButton.js';
import LogoutButton from './LogoutButton.js';
import '../style/Header.css';

class Header extends Component {
  render() {
    return (
      <Container fluid='md'>
        <nav>
          <h1>My All Times Favorite Movies LIST</h1>
          <ul>
            {this.props.isAuthenticated ? (
              <LogoutButton className='logoutButton' logoutUser={this.props.logoutUser}
                loginUser={this.props.loginUser} />
            ) : (
              <LoginButton className='commentBtnActive' />
            )}

            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='about'>about My Favorite Movies LIST APP</Link>
            </li>
            <li>
              <Link to='aboutMichellePannosch'>About Michelle Pannosch</Link>
            </li>
            <li>
              <Link to='MoviesList'>My Favorite Movies LIST</Link>
            </li>
          </ul>
        </nav>
      </Container>
    );
  }
}
export default Header;
