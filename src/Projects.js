import React, { Component } from 'react';
import { List, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

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

  linkTo() {
    withRouter(({ history }) => {
      return history.push('/ideas/1');
    });
  }

  render() {
    let projects = () => {
      let projects = this.state.projects;
      return projects.map((project, index) =>         
        <List.Item
          as='a'
          onClick={this.linkTo}
          key={index}>
          <Icon 
            name="idea" />
          <List.Content>
            { project.project_name } - 
            { project.point_of_contact }
          </List.Content>
        </List.Item>
      );
    }

    return (
      <List
        size='huge'
        divided
        celled>
        { projects() }
      </List>
    );
  }
}

export default Projects;
