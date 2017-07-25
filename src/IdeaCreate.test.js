import React from 'react';
import ReactDOM from 'react-dom';
import IdeaCreate from './IdeaCreate';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<IdeaCreate />, div);
});
