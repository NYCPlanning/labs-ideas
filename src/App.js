import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Ideas from './Ideas';
import Idea from './Idea';
import IdeaCreate from './IdeaCreate';
import Hero from './Hero';

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
        <Router>
          <div className="App">
            <Hero />
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
