import React, { Component, useRef, useState } from 'react'
import { useMutation, useLazyQuery, useQuery, gql, ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import styled from 'styled-components'

const MyDiv = styled.div`
// padding-bottom:400px;
overflow: hidden;
width:100%;
position: fixed;
margin: -9px -8px;
width:100vw;
display:flex;
justify-content: space-between;
  font-size: 11px;   color: rgb(38,38,38);
 border:solid grey 1px;  background-color: rgb(243,243,243);
  left:9px;   outline-width: 0;`

export default function Nav (props) {



    return (  
      <MyDiv>
      <h1 style={{"padding-left":"100px"}}>Logo</h1> 
      <h1 style={{"padding-right":"100px"}}>Links</h1> 
      </MyDiv>
        )
        }                                              