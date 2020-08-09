import React from "react"
import ReactDOM from "react-dom"
import App from "./Components/App.jsx"
import { createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { Provider } from "react-redux"
import allReducers from "./Reducers/allReducers"
import {API_URL} from "./Utils/utils"

import { createHttpLink,  ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
//GLOBAL STORE
const store = createStore(allReducers, composeWithDevTools())
const httpLink = createHttpLink( {uri: API_URL+"/gql"} )

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  return {
    headers: {...headers, authorization: localStorage.token ? `Bearer ${localStorage.token}` : ""}
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
       <App/>
    </ApolloProvider>
  </Provider>,
   
  document.getElementById('root')
)
