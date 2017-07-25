import React from 'react';
import ReactDOM from 'react-dom';
import { Route, MemoryRouter } from 'react-router-dom';

import Ideas from './Ideas';

// test data
const ideas = [{
  strategic_objectives: ['test'],
  project_id: 'test',
  slug: 'test',
  project_name: 'test',
  customer: 'test',
  short_description: 'test',
}];

it('Ideas renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter
      initialEntries={['/']}
    >
      <Route
        render={props => (
          <Ideas ideas={ideas} {...props} />)}
      />
    </MemoryRouter>, div);
});
