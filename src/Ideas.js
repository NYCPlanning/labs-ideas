import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import 'url-search-params-polyfill';
import slug from 'slug';

import './Ideas.css';

slug.defaults.mode = 'rfc3986';

const defaultSelection = ['Economic Development', 'Data and Expertise', 'Resiliency and Sustainability', 'Neighborhood Improvement', 'Housing'];

let allTags;

const checkIfAllSelected = (categories, all) => {
  let allSelected = true;
  all.forEach((d) => {
    if (categories.indexOf(d) < 0) allSelected = false;
  });
  return allSelected;
};

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

    const categories = queryCategories ? queryCategories.split(',') : defaultSelection;

    allTags = unique(ideas.reduce((a, b) => a.concat(b.tags), []).filter(Boolean));
    const tags = queryTags ? queryTags.split(',') : allTags;

    this.state = {
      categories,
      tags,
      search: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    const queryParams = new URLSearchParams(nextProps.location.search);

    if (!queryParams.get('categories')) {
      this.setState({
        categories: defaultSelection,
      });
    }
  }

  changeSearch = (event) => {
    this.setState({ search: event.target.value });
  }

  // updates filter state and query params based on a
  // clicked value, list of all possible values, and type
  changeFilter = (value, all, type) => {
    let currentSelected = this.state[type].slice();

    const allWereSelected = checkIfAllSelected(currentSelected, all);

    if (allWereSelected) {
      currentSelected = [value];
    } else if (currentSelected.indexOf(value) > -1) {
      currentSelected = removeItem(currentSelected, value);
    } else {
      currentSelected.push(value);
    }

    if (currentSelected.length === 0) currentSelected = all;

    this.state[type] = currentSelected;
    this.forceUpdate();

    this.updateParams();
  }

  updateParams() {
    const { history } = this.props;
    const { categories, tags } = this.state;

    const paramChunks = [];

    if (!checkIfAllSelected(categories, defaultSelection)) paramChunks.push(`categories=${categories.join(',')}`);
    if (!checkIfAllSelected(tags, allTags)) paramChunks.push(`tags=${tags.join(',')}`);

    const search = (paramChunks.length === 0) ? '' : `?${paramChunks.join('&')}`;

    history.push({ search });
  }

  render() {
    const { ideas } = this.props;
    const { categories, search, tags } = this.state;

    // markup and event bindings for categories
    const getObjectives = (objectives, header) => objectives
      .map((d) => {
        const disabled = (header && categories.indexOf(d) < 0) ? 'hollow' : '';

        const button = (
          <button
            key={d}
            onClick={header ? () => { this.changeFilter(d, defaultSelection, 'categories'); } : null}
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
            onClick={header ? () => { this.changeFilter(d, defaultSelection, 'categories'); } : null}
            className={`${slug(d)} ${disabled} label`}
          >
            {d}
          </span>
        );

        return header ? button : label;
      });

    const getTags = (theseTags, header) => theseTags
      .map((d) => {
        const disabled = (header && tags.indexOf(d) < 0) ? 'hollow' : '';

        const button = (
          <button
            key={d}
            onClick={header ? () => { this.changeFilter(d, allTags, 'tags'); } : null}
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
            onClick={header ? () => { this.changeFilter(d, allTags, 'tags'); } : null}
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
              <p className="tags">
                { d.strategic_objectives && getObjectives(d.strategic_objectives) }
                { d.tags && getTags(d.tags) }
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
              <p className="strategic-objectives">
                { getObjectives(defaultSelection, true) }
              </p>
            </div>
            <div>
              <small>Filter by Tag</small>
              <p className="strategic-objectives">
                { getTags(allTags, true) }
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
