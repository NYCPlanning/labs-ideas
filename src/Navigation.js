import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveNavigation, Menu, MenuItem } from 'react-foundation';

import './Spinner.css';

const Navigation = () => (
  <ResponsiveNavigation className="grid-container pl-site-header">
    <div className="grid-x grid-padding-x">
      <div className="cell large-auto">
        <a className="site-logo media_link" href="//planninglabs.nyc"><img src="//planninglabs.nyc/assets/img/logos/labs-logo.png" alt="NYC Planning Labs" /></a>
      </div>
      <div className="cell large-shrink">
        <Menu className="vertical large-horizontal">
          <MenuItem><a href="//planninglabs.nyc/about/"><span>About</span></a></MenuItem>
          <MenuItem><a href="//planninglabs.nyc/projects/"><span>Projects</span></a></MenuItem>
          <MenuItem><a href="//planninglabs.nyc/process/"><span>Process</span></a></MenuItem>
          <MenuItem><a href="//planninglabs.nyc/blog/"><span>Blog</span></a></MenuItem>
          <MenuItem><a href="//planninglabs.nyc/contact/"><span>Contact</span></a></MenuItem>
        </Menu>
      </div>
    </div>
  </ResponsiveNavigation>
);

Navigation.propTypes = {
  loading: PropTypes.bool,
};

Navigation.defaultProps = {
  loading: true,
};

export default Navigation;
