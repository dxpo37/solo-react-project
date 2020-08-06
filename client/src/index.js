import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,  Switch,  Route,  Link} from "react-router-dom";
import App from './App';
import Home from './Components/Home';
import styled from 'styled-components'


import {createStore} from 'redux'
import allReducers from "./Reducers/allReducers"
import { composeWithDevTools } from 'redux-devtools-extension'
import {Provider} from "react-redux"
import { createHttpLink, useQuery, gql, ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
//GLOBAL STORE
const store = createStore(allReducers, composeWithDevTools())

let url
process.env.NODE_ENV==="development"? url="http://localhost:6777" : url="https://solo-react-project.herokuapp.com/gql"

const httpLink = createHttpLink({
  uri: url,
});


const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})


ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <Router>
      <Switch>
        <Route path="/login"> <App/> </Route>
        <Route path="/home"> <Home/> </Route>
      </Switch>
      </Router>
    </ApolloProvider>
  </Provider>,
   
  document.getElementById('root')
)
