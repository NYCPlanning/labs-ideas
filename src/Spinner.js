import React from 'react';

import './Spinner.css';

const NotFound = () => (
  <div className="grid-container">
    <div className="grid-x grid-padding-x">
      <div
        className="cell large-text-center"
        style={{ padding: '100px 0' }}
      >
        <div className="spinner">
          <div className="bounce1" />
          <div className="bounce2" />
          <div className="bounce3" />
        </div>
      </div>
    </div>
  </div>
);

export default NotFound;
