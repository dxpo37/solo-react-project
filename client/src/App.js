import React from 'react';
import Login from './Components/Login'
import {} from "react-router-dom"
import { useQuery, gql, ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const USER = gql`
  { user(id:1)
    {
      firstName
    }
  }`

export default function App() {

  // const { loading, error, data } = useQuery(USER);
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :</p>;

  return (
    <>
      <Login/>
    </>
  );
}

