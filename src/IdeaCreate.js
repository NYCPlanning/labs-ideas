import React, { Component } from 'react';
import Spinner from './Spinner';
import './IdeaCreate.css';

class IdeaCreate extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
    };
  }

  iframeLoaded = () => {
    this.setState({
      loading: false,
    });
  }

  render() {
    const form = (
      <div className="idea">
        <Spinner loading={this.state.loading} />
        <script src="https://static.airtable.com/js/embed/embed_snippet_v1.js" />
        <iframe
          className="airtable-embed airtable-dynamic-height"
          onLoad={this.iframeLoaded}
          title="create-idea-form"
          src="https://airtable.com/embed/shrbPCJw2eEGtDpyN?backgroundColor=yellow"
          frameBorder="0"
          width="100%"
          height="1626"
        />

      </div>
    );

    return form;
  }
}

export default IdeaCreate;
