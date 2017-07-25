import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';

import Ideas from './Ideas';

jest.mock('react-router');

// test data
const ideas = [{
  strategic_objectives: 'test',
  project_id: 'test',
  slug: 'test',
  project_name: 'test',
  customer: 'test',
  short_description: 'test',
}];

it('Ideas renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Route
      exact
      path="/"
      render={props => (
        <Ideas ideas={ideas} {...props} />
      )}
    />, div);
});
