import React, { Component } from 'react';
import Projects from './Projects';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" component={Projects} />
          <Route path="/ideas/:id" />
        </div>
      </Router>
    );
  }
}

export default App;
