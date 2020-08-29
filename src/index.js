import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
//import { persistCache } from "apollo-cache-persist";
import { ApolloClient } from 'apollo-boost';

import * as serviceWorker from './serviceWorker'

import { store, persistor } from './redux/store';

import { default as App } from './App/App.container';
import { resolvers, typeDefs } from './graphql/resolvers';
import { default as data } from './graphql/initial-data';

const httpLink = createHttpLink({
  uri: 'https://crwn-clothing.com',
});

const cache = new InMemoryCache();

// await before instantiating ApolloClient, else queries might run before the cache is persisted
// persistCache({
//   cache,
//   storage: window.sessionStorage,
// });

const client = new ApolloClient({
  link: httpLink,
  cache,
  typeDefs,
  resolvers
});

client.writeData({ data });

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.register();