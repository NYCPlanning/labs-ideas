import React from 'react';
import PropTypes from 'prop-types';

import DisqusThread from './DisqusThread';

import './Idea.css';

const Idea = (props) => {
  const slug = props.match.params.slug;

  const idea = props.ideas.find(d => d.slug === slug);

  return (
    <div className="idea">
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

Idea.propTypes = {
  ideas: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string,
    }),
  }).isRequired,
};

export default Idea;