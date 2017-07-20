# Ideas
A React app that displays project ideas for nycplanninglabs.

## About
This is a single page app to allow users to submit and view project ideas, and to participate in discussion.  Each idea gets its own page and URL, and disqus comments.

## Tech
The app is based on [create-react-app](https://github.com/facebookincubator/create-react-app), and uses the built-in development server.

We are using airtable as an "instant backend", the app makes requests to the Airtable API to get JSON for each idea.
Form submissions go directly into airtable.  Once ideas are vetted, categorized, and cleaned up, they will be added to filtered view that this app can access via the Airtable api.

## Development
Clone this repo
Install dependencies: `npm install`
Start the development server: `npm start`


