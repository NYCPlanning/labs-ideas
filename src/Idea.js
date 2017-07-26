import React from 'react';
import PropTypes from 'prop-types';
import slug from 'slug';

import DisqusThread from './DisqusThread';
import NotFound from './NotFound';

import './Idea.css';

const Idea = (props) => {
  const pageId = props.match.params.id;

  const idea = props.ideas.find(d => d.project_id === parseInt(pageId, 10));

  const getObjectives = objectives => objectives.map(d => (
    <span key={d} className={`label ${slug(d)}`}>{d}</span>
  ));

  const objectives = idea && idea.strategic_objectives && idea.strategic_objectives.length > 0 ?
    getObjectives(idea.strategic_objectives) :
    <div>None</div>;

  return (
    <div className="idea">
      {idea &&
        (
          <div className="grid-container">
            <div className="grid-x grid-padding-x">
              <div className="cell large-8">
                <h2>{idea.project_name}</h2>
                <h3 className="header-tiny">Problem Statement</h3>
                <p>{ idea.problem_statement }</p>
                <h3 className="header-tiny">Description</h3>
                <p>{ idea.long_description }</p>
              </div>
              <div className="cell large-4">
                <div className="callout">
                  <h4 className="header-tiny">Customer</h4>
                  <p><strong>{ idea.customer }</strong></p>
                </div>
                <div className="callout">
                  <h4 className="header-tiny">Strategic Objectives</h4>
                  <p className="strategic-objectives">{ objectives }</p>
                </div>
                <div className="callout">
                  <h4 className="header-tiny">Project Type</h4>
                  <p className="tags">
                    <span className="label">Mapping</span>
                    <span className="label">Data Explorer</span>
                    <span className="label">Workflow</span>
                  </p>
                </div>
              </div>
              <div className="cell large-8">
                <DisqusThread
                  className="disqus"
                  id={idea.project_id.toString()}
                  title={idea.project_name}
                  path={`${idea.project_id}/${idea.slug}`}
                />
              </div>
            </div>
          </div>
        )
      }

      {
        !idea && <NotFound />
      }
    </div>
  );
};

Idea.propTypes = {
  ideas: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Idea;
