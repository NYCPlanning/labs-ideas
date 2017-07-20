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

        projects.forEach((project) => {
          const d = project;
          d.slug = Slug(d.project_name, { lower: true });
        });

        this.setState({ projects });
      });
  }

  render() {
    const { projects } = this.state;
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
      </div>
    );
  }
}

export default App;
