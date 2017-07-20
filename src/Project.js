import React from 'react';
import PropTypes from 'prop-types';

import './Project.css';

const Project = (props) => {
  const id = parseInt(props.match.params.id, 10);

  const idea = props.projects.find(d => d.project_id === id);

  return (
    <div className="project">
      {idea &&
        (
          <div>{idea.project_name} - { idea.point_of_contact }</div>
        )
      }
    </div>
  );
};

Project.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};

export default Project;
