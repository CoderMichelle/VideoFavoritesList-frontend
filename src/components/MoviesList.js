import React, { Component } from 'react';
// import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Movie from './Movie.js';

class MyMoviesListComponent extends Component {
  render() {
    let moviesComponentArray = [];
    if (this.props.results.length > 0) {
      moviesComponentArray = this.props.results.map((movie, index) => {
        return (
          <Movie
            key={`movie-${index}`}
            add={this.props.add}
            movieObj={movie}
            saving2List={this.props.saving2List}
            openModal={this.props.openModal}
            closeModal={this.props.closeModal}
          />
        );
      });
    }
    return (

      <Row xs={1} md={2} className="g-4">
        {moviesComponentArray}
      </Row>

    );
  }
}

export default MyMoviesListComponent;
