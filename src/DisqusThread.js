import React from 'react';
import PropTypes from 'prop-types';

const SHORTNAME = 'nycplanninglabs';
const WEBSITE_URL = 'https://ideas.planninglabs.nyc';

function renderDisqus() {
  if (window.DISQUS === undefined) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://${SHORTNAME}.disqus.com/embed.js`;
    document.getElementsByTagName('head')[0].appendChild(script);
  } else {
    window.DISQUS.reset({ reload: true });
  }
}

class DisqusThread extends React.Component {

  componentDidMount() {
    renderDisqus();
  }

  shouldComponentUpdate(nextProps) {
    return this.props.id !== nextProps.id ||
      this.props.title !== nextProps.title ||
      this.props.path !== nextProps.path;
  }

  componentDidUpdate() {
    renderDisqus();
  }

  render() {
    let { id, title, path, ...other} = this.props; // eslint-disable-line

    window.disqus_shortname = SHORTNAME;
    window.disqus_identifier = id;
    window.disqus_title = title;
    window.disqus_url = WEBSITE_URL + path;

    return <div {...other} id="disqus_thread" />;
  }
}

DisqusThread.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default DisqusThread;
