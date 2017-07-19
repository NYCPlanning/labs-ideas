import React, { Component } from 'react';
import Projects from './Projects';
import Project from './Project';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import $ from 'jquery';
import './App.css';


const projects_endpoint = '/projects/pipeline.json';
const protocol = 'http://'
const host = 'localhost:3000';
const projects_uri = protocol + host + projects_endpoint;

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      projects: []
    }
  }

  componentDidMount() {
    this.fetchProjectsData();
  }

  fetchProjectsData() {
    return $.getJSON(projects_uri)
      .then((projects) => {
        this.setState({
          projects
        });
      });
  }

  render() {
    return (
      <Router>
        <div className='App'>
          <Route exact path='/' component={Projects} />
          <Route path='/ideas/:id' component={Project} />
        </div>
      </Router>
    );
  }
}

export default App;
