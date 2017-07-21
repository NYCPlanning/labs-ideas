import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Ideas from './Ideas';
import Idea from './Idea';
import IdeaCreate from './IdeaCreate';


import './App.css';

const ideasUri = `https://api.planninglabs.nyc/ideas`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ideas: [],
    };
  }

  componentDidMount() {
    this.fetchIdeasData();
  }

  fetchIdeasData() {
    return fetch(ideasUri)
      .then(response => response.json())
      .then((ideas) => {
        this.setState({ ideas });
      });
  }

  render() {
    const { ideas } = this.state;
    return (
      <div>
        <div className="pl-hero">
          <div className="grid-container">
            <div className="grid-x grid-padding-x grid-padding-y">
              <div className="cell large-9">
                <h1 className="header-large">Project Ideas</h1>
                <p className="header-xxlarge">Discuss &amp; promote ideas for Planning Labs projects.</p>
              </div>
              <div className="cell large-3">
                <a href="index.html" className="button large expanded">All Ideas</a>
                <a href="submit.html" className="button large expanded">Submit Idea</a>
              </div>
            </div>
          </div>
        </div>
        <Router>
          <div className="App">
            <Route
              exact
              path="/"
              render={() => (
                <Ideas ideas={ideas} />
              )}
            />
            <Route
              path="/create"
              exact
              component={IdeaCreate}
            />
            <Route
              path="/:slug"
              render={props => (
                <Idea ideas={ideas} {...props} />
              )}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
