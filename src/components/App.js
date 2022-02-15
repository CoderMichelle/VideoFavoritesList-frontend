import React, { Component } from 'react';
import '../style/App.css';
import Header from './Header.js';
import Form from './Form.js';
import Footer from './Footer.js';
import About from './About.js';
import AboutMichellePannosch from './AboutMichellePannosch.js';
import MovieList from './MovieList.js';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Form />
        <About />
        <AboutMichellePannosch />
        <MovieList />
        Hello from App here is proof of life
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
