import React from 'react';
import PropTypes from 'prop-types';

import DisqusThread from './DisqusThread';
import NotFound from './NotFound';

import './Idea.css';

const Idea = (props) => {
  const slug = props.match.params.slug;

  const idea = props.ideas.find(d => d.slug === slug);

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
                  <p><strong>{ idea.division }</strong></p>
                </div>
                <div className="callout">
                  <h4 className="header-tiny">Strategic Objectives</h4>
                  <span className="label neighborhood-improvement">neighborhood-improvement</span>
                  <span className="label housing">housing</span>
                  <span className="label economic-development">economic-development</span>
                  <span className="label resiliency-and-sustainability">resiliency and sustainability</span>
                  <span className="label data-and-expertise">data-and-expertise</span>
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
