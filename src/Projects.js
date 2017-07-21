import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Projects.scss';

class Projects extends Component {
  render() {
    const getProjects = () => {
      const { projects } = this.props;
      return projects.map(d => (
        <div key={d.project_id} className="cell">
          <div className="card">
            <div className="card-section">
              <h3>
                <Link to={`/${d.slug}`}>
                  { d.project_name }
                </Link>
              </h3>
              <h4 className="header-small">{ d.division }</h4>
              <p>{ d.short_description }</p>
              <span className="label neighborhood-improvement">neighborhood-improvement</span>
              <span className="label housing">housing</span>
              <span className="label economic-development">economic-development</span>
              <span className="label resiliency-and-sustainability">resiliency and sustainability</span>
              <span className="label data-and-expertise">data-and-expertise</span>
            </div>
          </div>
        </div>
      ));
    };

    return (
      <div className="grid-container">
        <div className="grid-x grid-padding-x grid-padding-y medium-up-2">
          { getProjects() }
        </div>
      </div>
    );
  }
}

Projects.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Projects;
