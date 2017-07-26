import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import 'url-search-params-polyfill';
import slug from 'slug';

import './Ideas.css';

slug.defaults.mode = 'rfc3986';

const defaultSelection = ['Economic Development', 'Data and Expertise', 'Resiliency and Sustainability', 'Neighborhood Improvement', 'Housing'];

function checkIfAllSelected(categories, all) {
  let allSelected = true;
  all.forEach((d) => {
    if (categories.indexOf(d) < 0) allSelected = false;
  });
  return allSelected;
}

// utility helpers for arrays
function removeItem(array, value) {
  const index = array.indexOf(value);

  if (index > -1) {
    array.splice(index, 1);
  }

  return array;
}

class Ideas extends Component {
  constructor(props) {
    super();
    const { location } = props;
    const query = new URLSearchParams(location.search);
    const value = query.get('categories') || '';

    const categories = value ? value.split(',') : defaultSelection;

    this.state = { categories };
  }

  componentWillReceiveProps(nextProps) {
    const queryParams = new URLSearchParams(nextProps.location.search);

    if (!queryParams.get('categories')) {
      this.setState({
        categories: defaultSelection,
      });
    }
  }

  changeCategory = (clickedCategory) => {
    let categories = this.state.categories.slice();
    const { history } = this.props;

    const allWereSelected = checkIfAllSelected(categories, defaultSelection);

    if (allWereSelected) {
      categories = [clickedCategory];
    } else if (categories.indexOf(clickedCategory) > -1) {
      categories = removeItem(categories, clickedCategory);
    } else {
      categories.push(clickedCategory);
    }

    if (categories.length === 0) categories = defaultSelection;

    this.setState({ categories });

    const allAreSelected = checkIfAllSelected(categories, defaultSelection);

    history.push({
      search: allAreSelected ? '' : `?categories=${categories.join(',')}`,
    });
  }

  render() {
    const { ideas } = this.props;
    const { categories } = this.state;

    // markup and event bindings for categories
    const getObjectives = (objectives, header) => objectives
      .map((d) => {
        const disabled = (header && categories.indexOf(d) < 0) ? 'hollow' : '';

        const button = (
          <button
            key={d}
            onClick={header ? () => { this.changeCategory(d); } : null}
            className={`${slug(d)} ${disabled} button small`}
          >
            {d}
          </button>
        );

        const label = (
          <span
            key={d}
            role="button"
            tabIndex={0}
            onClick={header ? () => { this.changeCategory(d); } : null}
            className={`${slug(d)} ${disabled} label`}
          >
            {d}
          </span>
        );

        return header ? button : label;
      });

    // filter and decorate ideas with markup
    const getIdeas = () => ideas
      .filter(d => d.strategic_objectives && d.strategic_objectives.some(
        o => this.state.categories.indexOf(o) >= 0,
      ))
      .map(d => (
        <div key={d.project_id} className="cell">
          <div className="card">
            <div className="card-section">
              <h3>
                <Link to={`${d.project_id}/${d.slug}`}>
                  { d.project_name }
                </Link>
              </h3>
              <h4 className="header-small">{ d.customer }</h4>
              <p>{ d.short_description }</p>
              <p className="tags">{ d.strategic_objectives && getObjectives(d.strategic_objectives) }</p>
            </div>
          </div>
        </div>
      ));

    // put it all together
    return (
      <div className="grid-container ideas">
        <div className="grid-x grid-padding-x grid-padding-y">
          <div className="cell">
            <h3>Ideas submitted by DCP staff</h3>
          </div>
          <div className="cell large-3">
            <div>
              <small>Filter by <a href="https://www1.nyc.gov/site/planning/about/dcp-priorities.page">DCP Strategic Objective</a>:</small>
              <p className="strategic-objectives">
                { getObjectives(defaultSelection, true) }
              </p>
            </div>
          </div>
          <div className="cell large-9">
            <div className="ideas-grid">
              { getIdeas() }
            </div>
            <h4 className="text-center">Have an idea? <Link to={'/create'}>Submit one!</Link></h4>
          </div>
        </div>
      </div>
    );
  }
}

Ideas.propTypes = {
  ideas: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

export default Ideas;
