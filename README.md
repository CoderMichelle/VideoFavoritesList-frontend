# App Name: VideoFavoritesList-frontend

**Author**: CoderMichelle
**Version**: 1.0.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview

Built with React/MERN - allows user to search movies and create a favorites list.

## Getting Started

Note: You will need an API key for the .env file from the IMDB API for your backend server.

## Architecture

This React app reaches out to its own backend server, which then reaches out to the IMDB API.This app uses React on the frontend, with Bootstrap for styling and Axios for communicating with it's own backend server. After it receives the results from the user's query it displays these results using the movie poster from IMDB and a short description. It then allows the user to add their favorite movies to their own personal saved list. This selection gets communicated to its own backend server, which uses the information to save the new/updated list in CRUD modality to a database. This database first uses MongoDB locally and is later updated by using a deployed version using Atlas. This frontend app will be deployed on Netlify.

## Change Log
<!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an example:

02-05-2022 4:59pm -Setting up GitHub repositories, cloning them to my local working environment, creating SSH Keys, setting up README file.  -->

## Credit and Collaborations
<!-- Give credit (and a link) to other people or resources that helped you build this application. -->

Name of feature: Whiteboard
Estimate of time needed to complete: 15min
Start time: 9pm
Finish time: 9:30pm
Actual time needed to complete: 20min

Name of feature: Map,Long/Lat,API call
Estimate of time needed to complete: 2.5hrs
Start time: 5:30pm
Finish time: 11:00pm
Actual time needed to complete: 4.0hrs

Name of feature:
Estimate of time needed to complete:
Start time:
Finish time:
Actual time needed to complete:

![server diagram lab06](public/whiteboard.jpg)
