import React from 'react';
import PropTypes from 'prop-types';

import DisqusThread from './DisqusThread';

import './Project.css';

const Project = (props) => {
  const slug = props.match.params.slug;

  const idea = props.projects.find(d => d.slug === slug);

  return (
    <div className="project">
      {idea &&
        (
          <div>
            {idea.project_name} - { idea.point_of_contact }
            <DisqusThread
              id={idea.project_id.toString()}
              title={idea.project_name}
              path={`/ideas/${idea.slug}`}
            />
          </div>
        )
      }
    </div>
  );
};

Project.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string,
    }),
  }).isRequired,
};

export default Project;
