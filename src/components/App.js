import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import '../style/App.css';
import Header from './Header.js';
import Form from './Form.js';
import Footer from './Footer.js';
import About from './About.js';
import Alert from './Alert.js';
import AboutMichellePannosch from './AboutMichellePannosch.js';
import MoviesList from './MoviesList.js';
import ApiLoadingModal from './Modal.js';

import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      error: false,
      errorMessage: '',
      loading: false,
      showModal: false,
      saving2List: false,
      hasSearched: false,
      resultsFromServer: [],
      status: null,
      movieResultsShowing: false,
      myFavoriteMoviesList: [
        { title: 'firstSampleObject', hereIsFirstSampleObj: true }
      ]
    };
  }

  hoistInputFromMoviesForm = (inputfromform) => {
    if (inputfromform === '') {
      alert('Please enter a movie you d like to search for');
    } else {
      this.setState({
        searchInput: inputfromform,
        hasSearched: true,
        error: false,
        errorMessage: '',
      });
      this.apiCallTMDB(inputfromform);
    }
  };

  apiCallTMDB = async (searchInput) => {
    this.setState({ loading: true });
    try {
      let resultsFromServer = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/movies?movieName=${searchInput}`);
      // console.log('hurray we contacted the server and here is what she said:', resultsFromServer);
      if (resultsFromServer.status === 200) {
        this.setState({
          resultsFromServer: resultsFromServer.data,
          status: resultsFromServer.status
        });
      }
    } catch (error) {
      console.log('we are inside of apiCallTMDB error catch');
      this.setState({
        error: true,
        errorMessage: `There was an error contacting the server: ${error.message ? error.message : 'and the error message doesnt work either'}`
      });
    }
    setTimeout(() => this.setState({ loading: false }), 1000);
  };

  toggleLoading = () => {
    this.setState({ loading: !this.state.loading });
  };

  addToFavoriteMoviesLIST = movieObj => {
    if (!this.state.myFavoriteMoviesList.includes(movieObj)) {
      this.setState({
        saving2List: true,
        myFavoriteMoviesList: [...this.state.myFavoriteMoviesList, movieObj],
      });
      setTimeout(() => this.setState({ saving2List: false }), 3000);
    }
  };
  removeFromFavoriteMoviesLIST = movieObj => {
    let newFavoriteMoviesList = [...this.state.myFavoriteMoviesList];
    newFavoriteMoviesList = newFavoriteMoviesList.filter(
      item => item.title !== movieObj.title
    );
    this.setState({ myFavoriteMoviesList: newFavoriteMoviesList });
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        {this.state.error ? (
          <Alert alertMessage={this.state.errorMessage} />
        ) : (
          ''
        )}
        <Routes>
          <Route path='/' element={
            <React.Fragment>
              <Form hoistInputFromMoviesForm={this.hoistInputFromMoviesForm} />
              {this.state.loading ? (
                <ApiLoadingModal
                  openModal={this.openModal}
                  closeModal={this.closeModal}
                  modalHeaderText={'contacting IMDB'}
                  modalLoadingText={'LOADING YOUR RESULTS'}
                />
              ) : (
                ''
              )}

              {(this.state.resultsFromServer.length > 0) ? <MoviesList results={this.state.resultsFromServer} /> : ''}
            </React.Fragment>
          } />
          <Route path='about' element={<About />} />
          <Route path='aboutMichellePannosch' element={<AboutMichellePannosch />} />
          <Route path='MoviesList' element={<MoviesList results={this.state.resultsFromServer} toggleLoading={this.toggleLoading} />} />
        </Routes>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
