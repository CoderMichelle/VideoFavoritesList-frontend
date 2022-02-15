import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import '../style/Header.css';

class Header extends Component {
  render() {
    return (
      <Container fluid='md' maxwidt='sm'>
        <nav>
          <h1>My All Times Favorite Movies LIST</h1>
          <ul>
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
