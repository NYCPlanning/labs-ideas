import React, { Component } from 'react';
import Projects from './Projects';
import Project from './Project';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      projects: []
    }
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
