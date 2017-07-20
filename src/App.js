import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Slug from 'slug';

import Projects from './Projects';
import Project from './Project';
import IdeaCreate from './IdeaCreate';


import './App.css';

const projectsUri = `https://api.planninglabs.nyc/ideas`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
    };
  }

  componentDidMount() {
    this.fetchProjectsData();
  }

  fetchProjectsData() {
    return fetch(projectsUri)
      .then(response => response.json())
      .then((projects) => {
        this.setState({ projects });
      });
  }

  render() {
    const { projects } = this.state;
    return (
      <Router>
        <div className="App">
          <Route
            exact
            path="/"
            render={() => (
              <Projects projects={projects} />
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
              <Project projects={projects} {...props} />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
