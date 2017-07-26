import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    console.log('Scroll did update', this.props.location, prevProps.location);

    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

ScrollToTop.propTypes = {
  location: PropTypes.shape().isRequired,
  children: PropTypes.shape().isRequired,
};

export default withRouter(ScrollToTop);