import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import './Ideas.css';

class Ideas extends Component {
  render() {
    const getIdeas = () => {
      const { ideas } = this.props;
      return ideas.map(d => (
        <List.Item key={d.project_id} >
          <Icon name="idea" />
          <List.Content>
            <Link to={`/${d.slug}`}>
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
        { getIdeas() }
      </List>
    );
  }
}

Ideas.propTypes = {
  ideas: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Ideas;
