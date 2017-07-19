import React, { Component } from 'react';
import './Project.css';

class Project extends Component {
  constructor(props) {
    super();
    this.match = props.match;
  }

  render() {
    return (
      <div className="project">
      	{this.match.params.id}
      </div>
    );
  }
}

export default Project;
