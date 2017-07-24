import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => (
  <div className="pl-hero">
    <div className="grid-container">
      <div className="grid-x grid-padding-x grid-padding-y">
        <div className="cell large-9">
          <h1 className="header-large">Project Ideas</h1>
          <p className="header-xxlarge">Discuss &amp; promote ideas for Planning Labs projects.</p>
        </div>
        <div className="cell large-3">
          <Link to={'/'} className="button large expanded">
            All Ideas
          </Link>
          <Link to={'/create'} className="button large expanded">
            Submit Idea
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Hero;
