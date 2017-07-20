import React, { Component } from 'react';
import { List, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import './Projects.css';

const api_key = 'keyQBC5qtKpZy4cWf';
const table = 'Labs Project Tracking Staging';
const view = 'All Projects';
const projects_uri = `https://api.airtable.com/v0/app1f3lv9mx7L5xnY/${table}?view=${view}&api_key=${api_key}`;

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
    return fetch(projects_uri)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        let projects = response.records.map((record) => { return record.fields; });
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
