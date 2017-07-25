import React from 'react';
import ReactDOM from 'react-dom';
import { Route, MemoryRouter } from 'react-router-dom';

import Idea from './Idea';

// jest.mock('react-router');

const ideas = [{
  strategic_objectives: ['test'],
  project_id: 'test',
  slug: 'test',
  project_name: 'test',
  customer: 'test',
  short_description: 'test',
}];

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <MemoryRouter
      initialEntries={['/test-app']}
    >
      <Route
        render={props => (
          <Idea ideas={ideas} {...props} />)}
      />
    </MemoryRouter>, div);
});
