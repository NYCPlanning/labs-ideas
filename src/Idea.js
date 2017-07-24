import React from 'react';
import PropTypes from 'prop-types';
import slug from 'slug';

import DisqusThread from './DisqusThread';
import NotFound from './NotFound';

import './Idea.css';

const Idea = (props) => {
  const pageSlug = props.match.params.slug;

  const idea = props.ideas.find(d => d.slug === pageSlug);

  const getObjectives = (objectives) => {
    return objectives.map(d => (
      <span key={d} className={`label ${slug(d)}`}>{d}</span>
    ))
  }

  const objectives = idea && idea.strategic_objectives && idea.strategic_objectives.length > 0 ?
    getObjectives(idea.strategic_objectives):
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
                  { objectives }
                </div>
                <div className="callout">
                  <h4 className="header-tiny">Project Type</h4>
                  <span className="label">Mapping</span>
                  <span className="label">Data Explorer</span>
                  <span className="label">Workflow</span>
                </div>
              </div>
              <div className="cell large-8">
                <DisqusThread
                  className="disqus"
                  id={idea.project_id.toString()}
                  title={idea.project_name}
                  path={`/ideas/${idea.slug}`}
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
      slug: PropTypes.string,
    }),
  }).isRequired,
};

export default Idea;
