import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { withAuth0 } from '@auth0/auth0-react';
import '../style/App.css';

import Header from './Header.js';
import Form from './Form.js';
import Footer from './Footer.js';
import About from './About.js';
import Alert from './Alert.js';
import AboutMichellePannosch from './AboutMichellePannosch.js';
import MovieResultsFromAPI from './MoviesList.js';
import ApiLoadingModal from './Modal.js';
import StoredMoviesList from './StoredMoviesList.js';


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
      user: null,
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


  loginUser = userFromLogoutBtn => {
    this.setState({ user: userFromLogoutBtn });
  };

  logoutUser = () => {
    console.log('we are loggin OUT the user:', this.state.user);
    this.setState({ user: null });
  };

  addComment = (comment, movieObj) => {
    let newFavoriteMoviesList = [...this.state.myFavoriteMoviesList];
    console.log('newFavoriteMovieList before insertion', newFavoriteMoviesList);
    let indexOfMovie = newFavoriteMoviesList.indexOf(movieObj);
    let newMovieObj = { ...movieObj, comment: comment };
    newFavoriteMoviesList[indexOfMovie] = newMovieObj;
    console.log('newFavoriteMovieList after insertion', newFavoriteMoviesList);
    this.setState({ myFavoriteMoviesList: newFavoriteMoviesList });
  };

  render() {
    const { user, isAuthenticated } = this.props.auth0;
    console.log('here is user', user);
    console.log('here is this.props.auth0', this.props.auth0);
    return (
      <React.Fragment>
        <Header
          loginUser={this.loginUser}
          logoutUser={this.logoutUser}
          isAuthenticated={isAuthenticated}
        />
        {this.state.error ? (
          <Alert alertMessage={this.state.errorMessage} />
        ) : (
          ''
        )}
        <Routes>
          <Route path='/' element={
            <React.Fragment>
              <Form
                hoistInputFromMoviesForm={this.hoistInputFromMoviesForm}
                user={user}
              />
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

              {this.state.resultsFromServer.length > 0 ? (
                <MovieResultsFromAPI
                  results={this.state.resultsFromServer}
                  add={this.addToFavoriteMoviesLIST}
                  saving2List={this.state.saving2List}
                  openModal={this.openModal}
                  closeModal={this.closeModal}
                />
              ) : (
                ''
              )}
            </React.Fragment>
          } />

          <Route path='/about' element={<About />} />

          <Route path='/aboutMichellePannosch' element={<AboutMichellePannosch />} />

          <Route
            path='/MoviesList'
            element={
              <StoredMoviesList
                list={this.state.myFavoriteMoviesList}
                add={this.addToFavoriteMoviesLIST}
                remove={this.removeFromFavoriteMoviesLIST}
                addComment={this.addComment}
              />
            }
          />
        </Routes>
        <Footer />
      </React.Fragment>
    );
  }
}

export default withAuth0(App);
