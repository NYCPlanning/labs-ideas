import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import $ from 'jquery';
import './Projects.css';

const projects_endpoint = '/projects/pipeline.json';
const protocol = 'http://'
const host = 'localhost:3000';
const projects_uri = protocol + host + projects_endpoint;

class Projects extends Component {
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
    let projects = () => {
      let projects = this.state.projects;
      return projects.map((project, index) =>         
        <List.Item
          key={index}>
          <List.Content>
            { project.project_name }
          </List.Content>
        </List.Item>
      );
    }

    return (
        <List
          divided
          celled>
          { projects() }
        </List>
    );
  }
}

export default Projects;
