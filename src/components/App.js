import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import '../style/App.css';
import Header from './Header.js';
import Form from './Form.js';
import Footer from './Footer.js';
import About from './About.js';
import AboutMichellePannosch from './AboutMichellePannosch.js';
import MoviesList from './MoviesList.js';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Routes>
          <Route path='/' element={
            <React.Fragment>
              <Form />
              <MoviesList />
            </React.Fragment>
          } />
          <Route path='about' element={<About />} />
          <Route path='aboutMichellePannosch' element={<AboutMichellePannosch />} />
          <Route path='MoviesList' element={<MoviesList />} />
        </Routes>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
