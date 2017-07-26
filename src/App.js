import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-g-analytics';

import Ideas from './Ideas';
import Idea from './Idea';
import IdeaCreate from './IdeaCreate';
import Hero from './Hero';
import Spinner from './Spinner';

import './App.css';

const ideasUri = 'https://api.planninglabs.nyc/ideas';
const gaTrackingCode = 'UA-84250233-6';

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

    const routes = (
      <Switch>
        <Route
          exact
          path="/"
          render={props => (
            <Ideas ideas={ideas} {...props} />
          )}
        />
        <Route
          path="/create"
          exact
          component={IdeaCreate}
        />
        <Route
          path="/:id/*"
          render={props => (
            <Idea ideas={ideas} {...props} />
          )}
        />
      </Switch>
    );

    const content = ideas.length === 0 ? <Spinner /> : routes;

    return (
      <div>
        <Router id={gaTrackingCode}>
          <div className="App">
            <Hero />
            {content}
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
