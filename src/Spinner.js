import React from 'react';
import PropTypes from 'prop-types';

import './Spinner.css';

const Spinner = props => (
  <div>
    { props.loading &&
      (
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
      )
    };
  </div>
);

Spinner.propTypes = {
  loading: PropTypes.bool,
};

Spinner.defaultProps = {
  loading: true,
};

export default Spinner;
