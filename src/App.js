import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Projects from './Projects';
import Project from './Project';
import IdeaCreate from './IdeaCreate'

import './App.css';

const apiKey = 'keyQBC5qtKpZy4cWf';
const table = 'Labs Project Tracking Staging';
const view = 'All Projects';
const projectsUri = `https://api.airtable.com/v0/app1f3lv9mx7L5xnY/${table}?view=${view}&api_key=${apiKey}`;

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
      .then((response) => {
        const projects = response.records.map(record => record.fields);
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
            path="/ideas/:id"
            render={props => (
              <Project projects={projects} {...props} />
            )}
          />
          <Route
            path="/ideas/create"
            exact
            component={IdeaCreate}
          />
        </div>
      </Router>
    );
  }
}

export default App;
