import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import slug from 'slug';

import './Ideas.scss';

slug.defaults.mode = 'rfc3986';

class Ideas extends Component {
  render() {
    const objectives = (objectives) => {
      return objectives.map(d => (
        <span key={d} className={`label ${slug(d)}`}>{d}</span>
      ))
    }

    const getIdeas = () => {
      const { ideas } = this.props;
      const query = new URLSearchParams(this.props.location.search);
      const categories = query.get('categories').split(',');

      return ideas.map(d => (
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
              { d.strategic_objectives && objectives(d.strategic_objectives) }
            </div>
          </div>
        </div>
      ));
    };

    return (
      <div className="grid-container">
        <div className="grid-x grid-padding-x grid-padding-y medium-up-2">
          { getIdeas() }
        </div>
      </div>
    );
  }
}

Ideas.propTypes = {
  ideas: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Ideas;
