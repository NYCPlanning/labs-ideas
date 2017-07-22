import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import slug from 'slug';

import './Ideas.scss';

slug.defaults.mode = 'rfc3986';

const options = ['Economic Development','Data and Expertise','Resiliency and Sustainability', 'Neighborhood Improvement'];

class Ideas extends Component {
  constructor(props) {
    super();
    const { history, location } = props,
            query = new URLSearchParams(location.search),
            value = query.get('categories') || '';

    this.state = {
      categories: value.split(',') || options
    }
  }

  changeCategory = (clickedCategory) => {
    const categories = this.state.categories.slice();
    const { history } = this.props;

    if (categories.includes(clickedCategory)) {
      let newCategories = removeItem(categories, clickedCategory);
      this.setState({
        categories: newCategories
      });

    } else {
      categories.push(clickedCategory);
      this.setState({
        categories
      });
    }

    history.push({
      search: `?categories=${categories.join(',')}`
    });
  }

  render() {
    const { ideas } = this.props;

    // get array of unique options 
    let options = 
      unique(ideas.reduce((a,b,c) => {
        return a.concat(b.strategic_objectives);
      }, []).filter(Boolean));

    // markup and event bindings for categories
    const objectives = (objectives, clicked) => {
      return objectives.map(d => (
        <span key={d} 
              onClick={clicked ? clicked.bind(this,d) : null} 
              className={`label ${slug(d)}`}>{d}</span>
      ))
    }

    // filter and decorate ideas with markup
    const getIdeas = () => {
      return ideas
        .filter(d => {
          if(d.strategic_objectives) {
            return d.strategic_objectives.some(o => this.state.categories.indexOf(o) >= 0);
          }
        })
        .map(d => (
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

    // put it all together
    return (
      <div className="grid-container">
        { objectives(options, this.changeCategory) }
        Currently Selected: { this.state.categories.join(',') }
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

// utility helpers for arrays
function removeItem(array,value) {
  let index = array.indexOf(value);

  if (index > -1) {
     array.splice(index, 1);
  }

  return array;
}

function unique(array) {
  return array.filter((x, i, a) => a.indexOf(x) === i);
}

export default Ideas;
