import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import 'url-search-params-polyfill';
import slug from 'slug';

import './Ideas.css';

slug.defaults.mode = 'rfc3986';

const allCategories = ['Economic Development', 'Data and Expertise', 'Resiliency and Sustainability', 'Neighborhood Improvement', 'Housing'];

const allValues = {};

const checkIfAllSelected = (categories, all) =>
  all.every(element => (categories.indexOf(element) < 0) === false);

// utility helpers for arrays
const removeItem = (array, value) => {
  const index = array.indexOf(value);

  if (index > -1) {
    array.splice(index, 1);
  }

  return array;
};

const unique = array => array.filter((x, i, a) => a.indexOf(x) === i);

class Ideas extends Component {
  constructor(props) {
    super();
    const { location, ideas } = props;
    const query = new URLSearchParams(location.search);
    const queryCategories = query.get('categories') || '';
    const queryTags = query.get('tags') || '';

    allValues.categories = allCategories;
    allValues.tags = unique(
      ideas
        .reduce((accumulator, element) => accumulator.concat(element.tags), [])
        .filter(Boolean),
    );

    const categories = queryCategories ? queryCategories.split(',') : allValues.categories;
    const tags = queryTags ? queryTags.split(',') : allValues.tags;

    this.state = {
      categories,
      tags,
      search: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    const queryParams = new URLSearchParams(nextProps.location.search);

    if (!queryParams.get('categories')) {
      this.setState({ categories: allValues.categories });
    }
  }

  changeSearch = (event) => {
    this.setState({ search: event.target.value });
  }

  // updates filter state and query params based on a
  // clicked value, list of all possible values, and type
  changeFilter = (value, all, type) => {
    let currentSelected = this.state[type].slice();
    console.log(currentSelected);
    const allWereSelected = checkIfAllSelected(currentSelected, all);

    if (allWereSelected) {
      currentSelected = [value];
    } else if (currentSelected.indexOf(value) > -1) {
      currentSelected = removeItem(currentSelected, value);
    } else {
      currentSelected.push(value);
    }

    if (currentSelected.length === 0) currentSelected = all;

    let stateObject = {};
    stateObject[type] = currentSelected;

    this.setState(stateObject, () => {
      this.updateParams();
    });
  }

  // updates url query params from state
  updateParams() {
    const { history } = this.props;
    const { categories, tags } = this.state;

    const paramChunks = [];

    if (!checkIfAllSelected(categories, allValues.categories)) paramChunks.push(`categories=${categories.join(',')}`);
    if (!checkIfAllSelected(tags, allValues.tags)) paramChunks.push(`tags=${tags.join(',')}`);

    const search = (paramChunks.length === 0) ? '' : `?${paramChunks.join('&')}`;

    history.push({ search });
  }

  render() {
    const { ideas } = this.props;
    const { search } = this.state;
    // markup and event bindings for categories
    const getChips = (values, type, header) => values
      .map((d) => {
        const disabled = (header && this.state[type].indexOf(d) < 0) ? 'hollow' : '';

        const button = (
          <button
            key={d}
            onClick={header ? () => { this.changeFilter(d, allValues[type], type); } : null}
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
            onClick={header ? () => { this.changeFilter(d, allValues[type], type); } : null}
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
      .filter(d => d.tags && d.tags.some(
        o => this.state.tags.indexOf(o) >= 0,
      ))
      .filter(d => (d.project_name.toLowerCase().indexOf(search.toLowerCase()) >= 0) ||
        (d.short_description.toLowerCase().indexOf(search.toLowerCase()) >= 0))
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
              <p className="idea--tags">
                { d.strategic_objectives && getChips(d.strategic_objectives, 'categories') }
                { d.tags && getChips(d.tags, 'tags') }
              </p>
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
            <input type="text" value={this.state.search} onChange={this.changeSearch} />
            <div>
              <small>Filter by <a href="https://www1.nyc.gov/site/planning/about/dcp-priorities.page">DCP Strategic Objective</a>:</small>
              <p className="filter--strategic-objectives">
                { getChips(allValues.categories, 'categories', true) }
              </p>
            </div>
            <div>
              <small>Filter by Tag</small>
              <p className="filter--tags">
                { getChips(allValues.tags, 'tags', true) }
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
