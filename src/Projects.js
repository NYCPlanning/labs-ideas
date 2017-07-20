import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import './Projects.css';

class Projects extends Component {
  render() {
    const getProjects = () => {
      const { projects } = this.props;
      return projects.map(d => (
        <List.Item key={d.project_id} >
          <Icon name="idea" />
          <List.Content>
            <Link to={`/ideas/${d.project_id}`}>
              { d.project_name } - { d.point_of_contact }
            </Link>
          </List.Content>
        </List.Item>
      ));
    };

    return (
      <List
        size="huge"
        divided
        celled
      >
        { getProjects() }
      </List>
    );
  }
}

Projects.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Projects;
