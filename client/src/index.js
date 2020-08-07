import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router,  Switch,  Route} from "react-router-dom"
import App from './App'
import Home from './Components/Home'
import {createStore} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import {Provider} from "react-redux"
import allReducers from "./Reducers/allReducers"

import { createHttpLink,  ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
//GLOBAL STORE
const store = createStore(allReducers, composeWithDevTools())
const httpLink = createHttpLink({uri: "/gql"})
//heroku

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
          <Route exact path="/"> <App/> </Route>
          <Route exact path="/home"> <Home/> </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  </Provider>,
   
  document.getElementById('root')
)
